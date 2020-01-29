// refference: https://threejsfundamentals.org/threejs/lessons/threejs-offscreencanvas.html
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Fog,
  Color,
  EventDispatcher
} from 'three'
import Example from '@/models/example'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class App {
  /**
   * Render config
   */
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer

  /**
   * OrbitControls
   */
  // TODO: add orbitControls
  private controls: OrbitControls
  private workerListener: EventDispatcher
  /**
   * main page context
   * */
  private width: number
  private height: number
  private left: number
  private top: number
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
    left,
    top,
    pixelRatio
  }: {
    canvas: HTMLCanvasElement
    width: number
    height: number
    left: number
    top: number
    pixelRatio: number
  }) {
    /**
     * set three.js config
     */
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(width, height, false)

    /**
     * set context
     */
    this.width = width
    this.height = height
    this.left = left
    this.top = top
    this.pixelRatio = pixelRatio
    this.canvas = canvas
    /**
     * SET OrbitConrols
     * TODO: Fix Event handler.
     */
    // Escape document is not defined.
    if (!(self as any).document) {
      ;(self as any).window = this.canvas
      ;(self as any).document = {
        addEventListener: this.canvas.addEventListener.bind(this.canvas),
        removeEventListener: this.canvas.removeEventListener.bind(this.canvas)
      }
    }
    this.workerListener = new EventDispatcher()
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    /**
     * set models
     */
    this.example = new Example()
    /**
     * bind methods
     */
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEventWorker = this.handleEventWorker.bind(this)
    /**
     * Init
     */
    this.init()
  }

  /**
   * init
   */
  public init() {
    this.camera.position.z = 5
    this.scene.fog = new Fog(0x444466, 100, 400)
    this.scene.background = new Color(0x444466)
    this.example.position.x = 0
    this.example.position.y = 0
    this.scene.add(this.example)
    // orbitControls
    this.controls.addEventListener('change', this.animate)
  }

  /**
   * ClickEventHandler
   */
  public handleClick(e: MouseEvent) {
    console.log(e)
    // TODO: fix preventDefault
    // e.preventDefault()
    this.example.position.x = ((e.clientX - this.left) / this.width) * 2 - 1
    this.example.position.y = ((e.clientY - this.top) / this.height) * 2 + 1
    this.example.changeRotateRandom()
  }

  /**
   * handleEvent
   * use for worker.
   */
  public handleEventWorker(e: any) {
    // console.log(e)
    function noop() {}
    e.preventDefault = noop
    e.stopPropagation = noop
    this.workerListener.dispatchEvent(e)
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
