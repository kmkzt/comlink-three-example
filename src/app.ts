// https://github.com/mrdoob/three.js/blob/0f44080d7927b9949b9c67128f1efc9ea1239bd1/examples/js/offscreen/scene.js
import { PerspectiveCamera, Scene, WebGLRenderer, Fog, Color } from 'three'
import Example from '@/models/example'
// PRNG

export default class App {
  /**
   * Render config
   */
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer
  /**
   * main page context
   * */
  private width: number
  private height: number
  private pixelRatio: number
  private canvas: HTMLCanvasElement
  /**
   * three object
   */
  private example: Example
  constructor({
    canvas,
    width,
    height,
    pixelRatio
  }: {
    canvas: HTMLCanvasElement
    width: number
    height: number
    pixelRatio: number
  }) {
    /**
     * set three.js config
     */
    this.camera = new PerspectiveCamera(40, width / height, 1, 1000)
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(width, height, false)
    /**
     * set context
     */
    this.width = width
    this.height = height
    this.pixelRatio = pixelRatio
    this.canvas = canvas
    /**
     * set models
     */
    this.example = new Example()
    /**
     * bind methods
     */
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    /**
     * Init
     */
    this.init()
  }

  /**
   * init
   */
  public init() {
    this.camera.position.z = 200
    this.scene.fog = new Fog(0x444466, 100, 400)
    this.scene.background = new Color(0x444466)
    this.scene.add(this.example)
  }

  /**
   * animation behavior
   */
  public animate() {
    this.example.animate()
    this.renderer.render(this.scene, this.camera)
    if (self.requestAnimationFrame) {
      self.requestAnimationFrame(this.animate)
    } else {
      // Firefox
    }
  }
}
