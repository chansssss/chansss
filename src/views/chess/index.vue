/* eslint-disable no-debugger */
<template>
  <Win98Dialog @eventCallBack="eventCallBack" :zIndex="window.zIndex">
    <div class="game-container">
      <div class="left">
        <div class="chessboard">
          <template v-for="(row, rindex) in chessboard" :key="rindex">
            <template v-for="(point, cindex) in row" :key="cindex">
              <div
                class="point"
                @click="selectOrMove($event, point)"
                :class="point.type"
              >
                <span>{{ point.name }}</span>
              </div>
            </template>
            <div class="tchou" v-if="rindex == 4">
              <span>楚河汉界</span>
            </div>
          </template>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Chess",
  props: {
    window: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.initChessboard();
    this.initChessman();
  },
  data() {
    return {
      chessboard: [],
      currentKing: "red",
      currentSelectChessman: null,
    };
  },
  methods: {
    initChessboard() {
      let row = 10,
        col = 9;
      for (let i = 0; i < row; i++) {
        let temp = [];
        for (let j = 0; j < col; j++) {
          let point = {
            position: [i, j],
          };
          temp.push(point);
        }
        this.chessboard.push(temp);
      }
    },
    initChessman() {
      let arr = [
        ["车", "马", "象", "仕", "帅", "仕", "象", "马", "车"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "炮", "", "", "", "", "", "炮", ""],
        ["卒", "", "卒", "", "卒", "", "卒", "", "卒"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["卒", "", "卒", "", "卒", "", "卒", "", "卒"],
        ["", "炮", "", "", "", "", "", "炮", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["车", "马", "象", "仕", "帅", "仕", "象", "马", "车"],
      ];
      let type = "red";
      for (let i = 0; i < this.chessboard.length; i++) {
        if (i === 5) {
          type = "black";
        }
        for (let j = 0; j < this.chessboard[i].length; j++) {
          let chessman = this.chessboard[i][j];
          if (arr[i][j]) {
            chessman.type = type;
          } else {
            chessman.type = "none";
          }
          chessman.name = arr[i][j];
        }
      }
    },
    selectOrMove(event, point) {
      point = JSON.parse(JSON.stringify(point));
      // select event
      if (this.currentSelectChessman) {
        this.moveChessmanBefore(point);
      } else {
        this.selectChessman(point);
      }
    },
    selectChessman(point) {
      if (point.type === "none") {
        return;
      }
      this.currentSelectChessman = point;
    },
    moveChessmanBefore(targetPoint) {
      // 若落点与选中点都是同一方的棋子，切换选中的棋子
      if (targetPoint.type == this.currentSelectChessman.type) {
        // 若落点与选中点一样就什么都不做
        if (targetPoint.point === this.currentSelectChessman) return;
        this.selectChessman(targetPoint);
        return;
      } else {
        //判断该点是否能落子
        if (this.checkCanMove(this.currentSelectChessman, targetPoint)) {
          this.moveChessman(this.currentSelectChessman, targetPoint);
        } else {
          return;
        }
      }
    },
    checkCanMove(currentPoint, targetPoint) {
      let c_x = currentPoint.position[0],
        c_y = currentPoint.position[1];
      let t_x = targetPoint.position[0],
        t_y = targetPoint.position[1];
      if (currentPoint.name === "车") {
        return this.canMoveOfChe(c_x, c_y, t_x, t_y);
      }
      if (currentPoint.name === "炮") {
        return this.canMoveOfPao(c_x, c_y, t_x, t_y,targetPoint);
      }
      if (currentPoint.name === "马") {
        return this.canMoveOfMa(c_x, c_y, t_x, t_y);
      }
      if (currentPoint.name === "象") {
        return this.canMoveOfXiang(c_x, c_y, t_x, t_y);
      }
      return true;
    },
    // 判断车的落点是否合法
    canMoveOfChe(c_x, c_y, t_x, t_y) {
      return this.hasManyPoint(c_x, c_y, t_x, t_y)===0
    },
    // 判断马的落点是否合法
    canMoveOfMa(c_x, c_y, t_x, t_y) {
      //落点在马的上方
      if (c_x-t_x===2 && Math.abs(c_y-t_y)===1 && this.chessboard[c_x-1][c_y].type==="none") {
        return true
      }
      //落点在马的下方
      if (t_x-c_x===2 && Math.abs(c_y-t_y)===1 && this.chessboard[c_x+1][c_y].type==="none") {
        return true
      }
      //落点在马的左方
      if (c_y-t_y===2 && Math.abs(c_x-t_x)===1 && this.chessboard[c_x][c_y-1].type==="none") {
        return true
      }
      //落点在马的右方
      if (c_y-t_y===-2 && Math.abs(c_x-t_x)===1 && this.chessboard[c_x][c_y+1].type==="none") {
        return true
      }
      return false
    },
    // 判断象的落点是否合法
    canMoveOfXiang(c_x, c_y, t_x, t_y) {
      //落点在象的左上方
      if (c_x-t_x===2 && c_y-t_y===2 && this.chessboard[c_x-1][c_y-1].type==="none") {
        return true
      }
      //落点在象的右上方
      if (c_x-t_x===2 && c_y-t_y===-2 && this.chessboard[c_x-1][c_y+1].type==="none") {
        return true
      }
      //落点在象的左下方
      if (c_x-t_x===-2 && c_y-t_y===2 && this.chessboard[c_x+1][c_y-1].type==="none") {
        return true
      }
      //落点在象的右下方
      if (c_x-t_x===-2 && c_y-t_y===-2 && this.chessboard[c_x+1][c_y+1].type==="none") {
        return true
      }
      return false
    },
    // 判断炮的落点是否合法
    canMoveOfPao(c_x, c_y, t_x, t_y,targetPoint) {
      let temp = this.hasManyPoint(c_x, c_y, t_x, t_y)
      if (temp===1) {
        if (targetPoint.type === 'none') {
          return false
        }
        return true
      }else if(temp === 0){
         if (targetPoint.type === 'none') {
          return true
        }
      }
      return false
    },
    hasManyPoint(c_x, c_y, t_x, t_y){
      if (c_x !== t_x && c_y !== t_y) {
        return -1;
      }
      // eslint-disable-next-line no-debugger
      let count = 0
      let x,y
      let dValueX = c_x-t_x,dValueY=c_y-t_y
      if (dValueX >= 0) {
        x = t_x
      }else{
        x = c_x
      }
      if (dValueY >= 0) {
        y = t_y
      }else{
        y = c_y
      }
      if (dValueX===0) {
        for (let i = y+1; i < Math.abs(dValueY)+y; i++) {
          const element = this.chessboard[x][i];
          if (element.type !== 'none') {
            count++
          }
        }
      }
      if (dValueY===0) {
        for (let i = x+1; i < Math.abs(dValueX)+x; i++) {
          const element = this.chessboard[i][y];
          if (element.type !== 'none') {
            count++
          }
        }
      }
      return count
    },
    moveChessman(currentPoint, targetPoint) {
      let x = currentPoint.position[0],
        y = currentPoint.position[1];
      this.chessboard[x][y].name = "";
      this.chessboard[x][y].type = "none";
      let targetX = targetPoint.position[0],
        targetY = targetPoint.position[1];
      this.chessboard[targetX][targetY].name = currentPoint.name;
      this.chessboard[targetX][targetY].type = currentPoint.type;
      this.currentSelectChessman = null;
    },
    createChessman(name, type) {
      console.log(name, type);
    },
    eventCallBack({ event, eventName }) {
      this.$emit("windowEventCallBack", {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@pointWidth: 20px;
@pointHeight: 20px;
@tchouHeight: 40px;

.game-container {
  width: 550px;
  height: 400px;
  background-color: #fff;
  display: flex;
  .left {
    width: 450px;
    width: 400px;
    .chessboard {
      display: flex;
      flex-wrap: wrap;
      width: calc(9 * @pointWidth);
      margin: 50px auto;
      .point {
        width: @pointWidth;
        height: @pointHeight;
        border: 1px solid gainsboro;
      }
      .tchou {
        width: 100%;
        height: @tchouHeight;
        span {
          word-spacing: 2em;
        }
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
