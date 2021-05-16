<template>
  <Win98Dialog width="800px" height="600px" :z-index="window.zIndex" :title="window.name" @eventCallBack="eventCallBack">
    <ToolBar :btns="toolBarBtns" @toolBarEventCallBack="toolBarEventCallBack" />
    <div class="orbit-container">
      <Earth3D ref="earth" />
      <div class="sat-meta">
        <p>名称： {{ satMeta.name }}</p>
        <p>时间： {{ nowTime }}</p>
        <p>经度： {{ satMeta.lng }}</p>
        <p>纬度： {{ satMeta.lat }}</p>
        <p>高度： {{ satMeta.height }} km</p>
        <p>速度： {{ satMeta.velocity }} km/s</p>
      </div>
    </div>
  </Win98Dialog>
</template>

<script>
import { getLatLngObj, getSatelliteInfo } from 'tle.js'
import Earth3D from './Earth3D'
import dayjs from 'dayjs'

export default {
  name: 'Orbit',
  components: { Earth3D },
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toolBarBtns: [
        {
          name: '导入TLE',
          type: 'confirm'
        },
        {
          name: '帮助',
          type: 'message',
          content: '卫星追踪软件，使用卫星的tle数据计算出卫星轨道以及实时位置等信息。tle数据来源:<a href="http://celestrak.com/NORAD/elements"  target="_blank">celestrak</a>'
        }
      ],
      tleStr: '',
      optionalTimestampMS: +new Date(),
      map: null,
      threeEarth: null,
      mode: '3d',
      orbitLine: null,
      nowTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      satMeta: {
        name: 'ISS (ZARYA)',
        lat: '',
        lng: ''
      }
    }
  },
  computed: {},
  created() {
    this.tleStr = `ISS (ZARYA)
                  1 25544U 98067A   21131.20199259  .00000409  00000-0  15586-4 0  9997
                  2 25544  51.6446 165.6588 0002962 347.8170 123.7780 15.48989737282861`
    this.initSatMeta()
  },
  mounted() {
    this.updateSatMeta()
    this.addTle(this.tleStr)
  },
  methods: {
    toolBarEventCallBack({ btnName, data }) {
      if (btnName === '导入TLE') {
        this.addTle(data)
      }
    },
    eventCallBack({ event, eventName }) {
      if (eventName === 'resize') {
        this.$refs.earth.resize()
      }
      this.$emit('windowEventCallBack', {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName
      })
    },
    initSatMeta() {
      this.getSatMeta()
    },
    getSatMeta() {
      const temp = getSatelliteInfo(
        this.tleStr, // Satellite TLE string or array.
        +new Date() // Timestamp (ms)
      )
      this.satMeta.lat = temp.lat.toFixed(2)
      this.satMeta.lng = temp.lng.toFixed(2)
      this.satMeta.height = temp.height.toFixed(2)
      this.satMeta.velocity = temp.velocity.toFixed(2)
    },
    updateSatMeta() {
      const self = this
      setInterval(() => {
        self.getSatMeta()
        self.nowTime = dayjs(new Date()).format('HH:mm:ss')
      }, 1000)
    },
    addTle(tle) {
      console.log('addtle')
      this.$refs.earth.handlerDrawSatAnOrbit(tle)
    },
    getSatPoint() {
      const latLonObj = getLatLngObj(this.tleStr, +new Date())
      return [latLonObj.lng, latLonObj.lat]
    }
  }
}
</script>

<style lang="less" scoped>
.orbit-container {
  height:calc(100% - 26px);
  position: relative;
}
.sat-meta {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 5px #2c3e50;
  background: #34495e70;
  padding: 10px;
  p {
    line-height: 26px;
    margin: 0;
    padding: 0;
    color: #ecf0f1;
    font-size: 14px;
  }
}

.sat-point {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 220px;
  border-radius: 4px;
  box-shadow: 0 1px 5px #2c3e50;
  background: #34495e70;
  transform: translateX(-50%);
  height: 30px;
  padding: 0 8px;
  span {
    line-height: 30px;
    color: #ecf0f1 !important;
  }
}
</style>

