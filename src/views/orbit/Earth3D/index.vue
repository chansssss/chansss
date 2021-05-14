<template>
  <div class="earth-3d">
    <canvas class="webgl" />
  </div>
</template>

<script>
import * as THREE from 'three'
import { getSatPoint } from '@/utils/sat-utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  props: {
    tle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      earth: null,
      orbitLine: null,
      sat: null,
      earthMapImg: ''
    }
  },
  mounted() {
    this.earthMapImg = require('../../../assets/imgs/earth.jpg')
    this.initThree()
    this.initEarth()
    this.initSat()
    // this.initStars()
    this.initLight()
    this.$emit('loadDone')
    this.animate()
  },
  methods: {
    getThreInstance() {
      return { scene: this.scene, camera: this.camera, renderer: this.renderer }
    },
    resize() {
      const containerDom = document.getElementsByClassName('earth-3d')[0]
      if (!containerDom) {
        return
      }
      const self = this
      const sizes = {
        width: containerDom.offsetWidth,
        height: containerDom.offsetHeight
      }
      // Update sizes
      sizes.width = containerDom.offsetWidth
      sizes.height = containerDom.offsetHeight

      // Update camera
      self.camera.aspect = sizes.width / sizes.height
      self.camera.updateProjectionMatrix()

      // Update renderer
      self.renderer.setSize(sizes.width, sizes.height)
      self.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    initThree() {
      const self = this
      const containerDom = document.getElementsByClassName('earth-3d')[0]
      const sizes = {
        width: containerDom.offsetWidth,
        height: containerDom.offsetHeight
      }
      window.addEventListener('resize', () => {
        self.resize()
      })
      const canvas = document.querySelector('canvas.webgl')
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 25
      this.scene.add(this.camera)
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
      })
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      console.log(controls)
      this.renderer.setSize(sizes.width, sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    initEarth() {
      const geometry = new THREE.SphereGeometry(10, 32, 32)
      const mapTexture = new THREE.TextureLoader().load(this.earthMapImg)
      const material = new THREE.MeshPhongMaterial({
        shininess: 40,
        bumpScale: 1,
        map: mapTexture
      })
      this.earth = new THREE.Mesh(geometry, material)
      this.scene.add(this.earth)
    },
    initSat() {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        shininess: 40,
        bumpScale: 1,
        color: 0x3498db
      })
      this.sat = new THREE.Mesh(geometry, material)
      this.scene.add(this.sat)
    },
    initLight() {
      // var axesHelper = new THREE.AxesHelper(50);
      // this.scene.add(axesHelper);
      this.scene.add(new THREE.AmbientLight(0x888888))
      const pointLight = new THREE.PointLight(0xffffff, 1, 100)
      pointLight.position.set(0, 0, 30)
      // this.scene.add(pointLight);
      var light = new THREE.DirectionalLight(0xcccccc, 1)
      light.position.set(5, 5, 30)
      this.scene.add(light)
      light.castShadow = true
      light.shadowCameraNear = 0.01
      light.shadowCameraFar = 15
      light.shadowCameraFov = 45

      light.shadowCameraLeft = -1
      light.shadowCameraRight = 1
      light.shadowCameraTop = 1
      light.shadowCameraBottom = -1
      // light.shadowCameraVisible	= true

      light.shadowBias = 0.001
      light.shadowDarkness = 0.2

      light.shadowMapWidth = 1024 * 2
      light.shadowMapHeight = 1024 * 2
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    drawOrbit(orbit) {
      const points = []
      for (let i = 0; i < orbit.length; i++) {
        const element = orbit[i]
        const point = this.getThreePosition(element[1], element[0], 12)
        points.push(point)
      }
      const material = new THREE.LineBasicMaterial({ color: 0xecf0f1 })
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      this.orbitLine = new THREE.Line(geometry, material)
      this.scene.add(this.orbitLine)
    },
    getThreePosition(lat, lon, radius) {
      var phi = (90 - lat) * (Math.PI / 180)
      var theta = (lon + 180) * (Math.PI / 180)
      const x = -((radius) * Math.sin(phi) * Math.cos(theta))
      const z = ((radius) * Math.sin(phi) * Math.sin(theta))
      const y = ((radius) * Math.cos(phi))
      return new THREE.Vector3(x, y, z)
    },
    initStars() {
      const r = 30; const starsGeometry = [new THREE.BufferGeometry(), new THREE.BufferGeometry()]

      const vertices1 = []
      const vertices2 = []

      const vertex = new THREE.Vector3()

      for (let i = 0; i < 30; i++) {
        vertex.x = Math.random() * 2 - 1
        vertex.y = Math.random() * 2 - 1
        vertex.z = Math.random() * 2 - 1
        vertex.multiplyScalar(r)

        vertices1.push(vertex.x, vertex.y, vertex.z)
      }

      for (let i = 0; i < 30; i++) {
        vertex.x = Math.random() * 2 - 1
        vertex.y = Math.random() * 2 - 1
        vertex.z = Math.random() * 5 - 1
        vertex.multiplyScalar(r)

        vertices2.push(vertex.x, vertex.y, vertex.z)
      }

      starsGeometry[0].setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3))
      starsGeometry[1].setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3))

      const starsMaterials = [
        new THREE.PointsMaterial({ color: 0xFFFFFF, size: 2, sizeAttenuation: false })
      ]

      for (let i = 10; i < 30; i++) {
        const stars = new THREE.Points(starsGeometry[i % 2], starsMaterials[0])

        stars.rotation.x = Math.random() * 6
        stars.rotation.y = Math.random() * 6
        stars.rotation.z = Math.random() * 6
        stars.scale.setScalar(i * 10)

        stars.matrixAutoUpdate = false
        stars.updateMatrix()

        this.scene.add(stars)
      }
    },
    animate() {
      const self = this
      const clock = new THREE.Clock()
      function tick() {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        // self.earth.rotation.y = .5 * elapsedTime
        // if (self.orbitLine) {
        //   self.orbitLine.rotation.y = .5 * elapsedTime
        // }
        if (self.sat) {
          const point = getSatPoint(self.tle)
          const position = self.getThreePosition(point[1], point[0], 12)
          self.sat.position.x = position.x
          self.sat.position.y = position.y
          self.sat.position.z = position.z
          self.sat.rotation.y = 0.5 * elapsedTime
          self
        }

        // Update Orbital Controls
        // controls.update()

        // Render
        self.render()
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick()
    }
  }
}
</script>

<style>
.earth-3d {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
