<template>
  <Win98Dialog :z-index="window.zIndex" @eventCallBack="eventCallBack">
    <div class="orbit-container">
      <Earth3D ref="earth" :tle="tleStr" @loadDone="loadDone" />
      <div class="sat-meta">
        <p>名称：{{ satMeta.name }}</p>
        <p>时间：{{ nowTime }}</p>
        <p>经度：{{ satMeta.lng }}</p>
        <p>纬度：{{ satMeta.lat }}</p>
        <p>高度：{{ satMeta.height }} km</p>
        <p>速度：{{ satMeta.velocity }} km/s</p>
      </div>
    </div>
  </Win98Dialog>
</template>

<script>
import { getGroundTracks, getLatLngObj, getSatelliteInfo } from 'tle.js'
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
  },
  methods: {
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
        self.nowTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    loadDone() {
      this.computerOrbitLine()
    },
    init() {
      this.drawOrbitOfThree()
    },
    drawOrbitOfThree() {
      this.$refs.earth.drawOrbit(this.orbitLine)
    },
    getSatPoint() {
      const latLonObj = getLatLngObj(this.tleStr, +new Date())
      return [latLonObj.lng, latLonObj.lat]
    },
    computerOrbitLine() {
      const self = this
      getGroundTracks({
        tle: self.tleStr,
        startTimeMS: this.optionalTimestampMS,
        stepMS: 100000,
        isLngLatFormat: true
      }).then(function(threeOrbitsArr) {
        self.orbitLine = threeOrbitsArr[1]
        self.init()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.orbit-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.sat-meta {
  position: absolute;
  top: 10px;
  left: 10px;
  min-width: 150px;
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

