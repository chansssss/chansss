<template>
  <Win98Dialog :z-index="window.zIndex" @eventCallBack="eventCallBack">
    <div class="game-container">
      <div class="left">
        <div class="chessboard">
          <template v-for="(row, rindex) in chessboard">
            <template v-for="(point, cindex) in row">
              <div
                :key="rindex+''+cindex"
                class="point"
                :class="point.color"
                @click="selectOrMove($event, point)"
              >
                <div
                  v-if="
                    currentSelectChessman &&
                      currentSelectChessman.position[0] === rindex &&
                      currentSelectChessman.position[1] === cindex
                  "
                  class="selected"
                  :class="point.color"
                />
                <div
                  v-if="point.type !== 'none'"
                  class="chessman"
                  :class="point.color"
                >
                  <span>{{ point.name }}</span>
                </div>
              </div>
            </template>
            <div v-if="rindex == 4" :key="rindex+''+cindex" class="tchou">
              <!-- <span>楚河汉界</span> -->
            </div>
          </template>
        </div>
      </div>
      <div class="right" />
    </div>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Chess',
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chessboard: [],
      currentRound: 'bottom',
      currentSelectChessman: null,
      colorMapper: {
        top: 'black',
        bottom: 'red'
      },
      kingsPoint: {
        top: { type: 'top', name: '帅', position: [0, 4] },
        bottom: { type: 'bottom', name: '帅', position: [8, 4] }
      }
    }
  },
  created() {
    this.initChessboard()
    this.initChessman()
  },
  methods: {
    // 初始化棋盘上的点
    initChessboard() {
      const row = 10
      const col = 9
      for (let i = 0; i < row; i++) {
        const temp = []
        for (let j = 0; j < col; j++) {
          const point = {
            position: [i, j]
          }
          temp.push(point)
        }
        this.chessboard.push(temp)
      }
    },
    // 初始化棋子
    initChessman() {
      const arr = [
        ['车', '马', '象', '仕', '帅', '仕', '象', '马', '车'],
        ['', '', '', '', '', '', '', '', ''],
        ['', '炮', '', '', '', '', '', '炮', ''],
        ['卒', '', '卒', '', '卒', '', '卒', '', '卒'],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['卒', '', '卒', '', '卒', '', '卒', '', '卒'],
        ['', '炮', '', '', '', '', '', '炮', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['车', '马', '象', '仕', '帅', '仕', '象', '马', '车']
      ]
      let type = 'top'
      for (let i = 0; i < this.chessboard.length; i++) {
        if (i === 5) {
          type = 'bottom'
        }
        for (let j = 0; j < this.chessboard[i].length; j++) {
          const chessman = this.chessboard[i][j]
          if (arr[i][j]) {
            chessman.type = type
            chessman.color = this.colorMapper[type]
          } else {
            chessman.type = 'none'
            chessman.color = ''
          }
          chessman.name = arr[i][j]
        }
      }
    },
    // 用户点击棋子事件，可能是落点，可能是选中棋子
    selectOrMove(event, point) {
      point = JSON.parse(JSON.stringify(point))
      // select event
      if (this.currentSelectChessman) {
        this.moveChessmanBefore(point)
      } else {
        this.selectChessman(point)
      }
    },
    // 选中棋子事件
    selectChessman(point) {
      if (point.type === 'none') {
        return
      }
      if (this.currentRound === point.type) {
        this.currentSelectChessman = point
      }
    },
    moveChessmanBefore(targetPoint) {
      // 若落点与选中点都是同一方的棋子，切换选中的棋子
      if (targetPoint.type === this.currentSelectChessman.type) {
        // 若落点与选中点一样就什么都不做
        if (targetPoint.point === this.currentSelectChessman) return
        this.selectChessman(targetPoint)
        return
      } else {
        // 判断该点是否能落子
        if (this.checkCanMove(this.currentSelectChessman, targetPoint)) {
          this.moveChessman(this.currentSelectChessman, targetPoint)
          console.log('----' + this.isDanger('top'))
        } else {
          return
        }
      }
    },
    // 检查棋子落点合法性
    checkCanMove(currentPoint, targetPoint) {
      const c_x = currentPoint.position[0]
      const c_y = currentPoint.position[1]
      const t_x = targetPoint.position[0]
      const t_y = targetPoint.position[1]
      if (currentPoint.name === '车') {
        return this.canMoveOfChe(c_x, c_y, t_x, t_y)
      }
      if (currentPoint.name === '炮') {
        return this.canMoveOfPao(c_x, c_y, t_x, t_y, targetPoint)
      }
      if (currentPoint.name === '马') {
        return this.canMoveOfMa(c_x, c_y, t_x, t_y)
      }
      if (currentPoint.name === '象') {
        if (this.isCrossRiver(currentPoint.type, t_x)) return false
        return this.canMoveOfXiang(c_x, c_y, t_x, t_y)
      }
      if (currentPoint.name === '卒') {
        return this.canMoveOfZu(c_x, c_y, t_x, t_y, currentPoint.type)
      }
      if (currentPoint.name === '仕') {
        return this.canMoveOfShi(c_x, c_y, t_x, t_y, currentPoint)
      }
      if (currentPoint.name === '帅') {
        return this.canMoveOfShuai(c_x, c_y, t_x, t_y, currentPoint)
      }
      return true
    },
    // 棋子过河了吗
    isCrossRiver(type, t_x) {
      if (type === 'top' && t_x >= 5) return true
      if (type === 'bottom' && t_x < 5) return true
      return false
    },
    // 判断卒的落点是否合法
    canMoveOfZu(c_x, c_y, t_x, t_y, currentType) {
      const { axis, distance } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (this.isCrossRiver(currentType, t_x)) {
        if (axis === 'yaxis' && Math.abs(distance) === 1) {
          return true
        }
      }
      if (currentType === 'top') {
        if (axis === 'xaxis' && distance < 0 && Math.abs(distance) === 1) {
          return true
        }
      } else {
        if (axis === 'xaxis' && distance > 0 && Math.abs(distance) === 1) {
          return true
        }
      }
      return false
    },
    // 判断车的落点是否合法
    canMoveOfChe(c_x, c_y, t_x, t_y) {
      const { count, axis } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (axis === 'xaxis' || axis === 'yaxis') {
        if (count === 0) {
          return true
        }
      }
      return false
    },
    // 判断马的落点是否合法
    canMoveOfMa(c_x, c_y, t_x, t_y) {
      // 落点在马的上方
      if (
        c_x - t_x === 2 &&
        Math.abs(c_y - t_y) === 1 &&
        this.chessboard[c_x - 1][c_y].type === 'none'
      ) {
        return true
      }
      // 落点在马的下方
      if (
        t_x - c_x === 2 &&
        Math.abs(c_y - t_y) === 1 &&
        this.chessboard[c_x + 1][c_y].type === 'none'
      ) {
        return true
      }
      // 落点在马的左方
      if (
        c_y - t_y === 2 &&
        Math.abs(c_x - t_x) === 1 &&
        this.chessboard[c_x][c_y - 1].type === 'none'
      ) {
        return true
      }
      // 落点在马的右方
      if (
        c_y - t_y === -2 &&
        Math.abs(c_x - t_x) === 1 &&
        this.chessboard[c_x][c_y + 1].type === 'none'
      ) {
        return true
      }
      return false
    },
    // 判断象的落点是否合法
    canMoveOfXiang(c_x, c_y, t_x, t_y) {
      const { count, axis, distance } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (axis === 'oblique' && distance === 2 && count === 0) return true
      return false
    },
    // 判断仕的落点是否合法
    canMoveOfShi(c_x, c_y, t_x, t_y, currentPoint) {
      const { axis, distance } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (axis === 'oblique' && distance === 1) {
        if (currentPoint.type === 'bottom' && t_x >= 7 && t_y >= 3 && t_y <= 5) { return true }
        if (currentPoint.type === 'top' && t_x <= 2 && t_y >= 3 && t_y <= 5) { return true }
      }
      return false
    },
    // 判断帅的落点是否合法
    canMoveOfShuai(c_x, c_y, t_x, t_y, currentPoint) {
      const { axis, distance } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (axis === 'xaxis' || (axis === 'yaxis' && Math.abs(distance) === 1)) {
        if (currentPoint.type === 'bottom' && t_x >= 7 && t_y >= 3 && t_y <= 5) { return true }
        if (currentPoint.type === 'top' && t_x <= 2 && t_y >= 3 && t_y <= 5) { return true }
      }
      return false
    },
    // 判断炮的落点是否合法
    canMoveOfPao(c_x, c_y, t_x, t_y, targetPoint) {
      const { count, axis } = this.computerTwoPoint(c_x, c_y, t_x, t_y)
      if (axis === 'xaxis' || axis === 'yaxis') {
        if (count === 1) {
          if (targetPoint.type === 'none') {
            return false
          }
          return true
        } else if (count === 0) {
          if (targetPoint.type === 'none') {
            return true
          }
        }
      }

      return false
    },
    // 获取两点连线的方向，距离，两点之间的有效棋子
    computerTwoPoint(c_x, c_y, t_x, t_y) {
      const resp = { count: 0 }
      let x, y
      const dValueX = c_x - t_x
      const dValueY = c_y - t_y
      if (dValueX >= 0) {
        x = t_x
      } else {
        x = c_x
      }
      if (dValueY >= 0) {
        y = t_y
      } else {
        y = c_y
      }
      if (dValueX === 0) {
        for (let i = y + 1; i < Math.abs(dValueY) + y; i++) {
          const element = this.chessboard[x][i]
          if (element.type !== 'none') {
            resp.count++
          }
        }
        resp.axis = 'yaxis'
        resp.distance = dValueY
      }
      if (dValueY === 0) {
        for (let i = x + 1; i < Math.abs(dValueX) + x; i++) {
          const element = this.chessboard[i][y]
          if (element.type !== 'none') {
            resp.count++
          }
        }
        resp.axis = 'xaxis'
        resp.distance = dValueX
      }
      if (Math.abs(dValueX) === Math.abs(dValueY)) {
        resp.distance = Math.abs(dValueX)
        for (let i = 1; i <= resp.distance; i++) {
          const element = this.chessboard[x + i][y + i]
          if (element.type !== 'none') {
            resp.count++
          }
        }
        resp.axis = 'oblique'
      }
      return resp
    },
    // 移动棋子
    moveChessman(currentPoint, targetPoint) {
      const x = currentPoint.position[0]
      const y = currentPoint.position[1]
      this.chessboard[x][y].name = ''
      this.chessboard[x][y].type = 'none'
      this.chessboard[x][y].color = ''

      const targetX = targetPoint.position[0]
      const targetY = targetPoint.position[1]
      this.chessboard[targetX][targetY].name = currentPoint.name
      this.chessboard[targetX][targetY].type = currentPoint.type
      this.chessboard[targetX][targetY].color = this.colorMapper[
        currentPoint.type
      ]

      this.currentSelectChessman = null
      // 更新 帅 的点
      if (currentPoint.name === '帅') {
        this.kingsPoint[currentPoint.type] = JSON.stringify(
          JSON.parse(this.chessboard[targetX][targetY])
        )
      }
      // 更新当前该谁落子
      this.currentRound = this.currentRound === 'top' ? 'bottom' : 'top'
    },
    eventCallBack({ event, eventName }) {
      this.$emit('windowEventCallBack', {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName
      })
    },
    // 判断是否被将军
    isDanger(type) {
      for (let i = 0; i < this.chessboard.length; i++) {
        for (let j = 0; j < this.chessboard[i].length; j++) {
          const point = this.chessboard[i][j]
          if (
            point.name !== '帅' &&
            point.type !== type &&
            point.type !== 'none' &&
            this.checkCanMove(point, this.kingsPoint[type])
          ) { return true }
        }
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
@pointWidth: 36px;
@pointHeight: 35px;
@tchouHeight: 40px;

.game-container {
  width: 550px;
  height: 500px;
  background-color: #fff;
  display: flex;
  .left {
    .chessboard {
      padding: 20px 39px;
      display: flex;
      flex-wrap: wrap;
      width: 408px;
      height: 415px;
      background-image: url(../../assets/imgs/bg.png);
      background-size: 400px 480px;
      margin: 20px auto;
      .point {
        width: @pointWidth;
        height: @pointHeight;
        position: relative;
        .selected {
          position: absolute;
          width: 34px;
          height: 34px;
          top: 1px;
          left: 1px;
        }
        .selected.red {
          border: 1px dotted red;
        }
        .selected.black {
          border: 1px dotted black;
        }
        .chessman {
          font-family: 'LiSu';
          margin: 3px;
          background-color: blanchedalmond;
          display: block;
          content: "";
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 1px solid black;
          border-radius: 50%;
        }
        // .chessman.red {
        //   color: red;
        //   background-color: #fff;
        // }
      }

      .tchou {
        width: 100%;
        height: 30px;
      }
    }
  }
  .right {
    flex: 1;
  }
}

.red {
  color: red;
}
.black {
  color: black;
}
</style>
