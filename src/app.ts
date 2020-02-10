import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Fog,
  Color,
  DirectionalLight
} from 'three'
import Example from '@/models/example'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ProxyElement from './utils/ProxyElement'
import { genParticle } from '@/models/particle'
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
  private controls: OrbitControls
  private listenerElement: HTMLElement
  private isOffscrenCanvas: boolean = false
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
    // For offscrenn canvas. Escape document is not defined.
    // refference: https://threejsfundamentals.org/threejs/lessons/threejs-offscreencanvas.html
    if (!(self as any).document) {
      this.isOffscrenCanvas = true
      this.listenerElement = new ProxyElement({
        width,
        height,
        left,
        top
      }) as any
      ;(self as any).window = this.listenerElement
      ;(self as any).document = {
        addEventListener: this.listenerElement.addEventListener.bind(
          this.listenerElement
        ),
        removeEventListener: this.listenerElement.removeEventListener.bind(
          this.listenerElement
        )
      }
    } else {
      this.listenerElement = this.canvas
    }
    this.controls = new OrbitControls(this.camera, this.listenerElement)
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
    /**
     * Three config
     */
    this.camera.position.z = 5
    this.scene.fog = new Fog(0x444466, 100, 400)
    this.scene.background = new Color(0x444466)
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(1, 1, 1).normalize()

    /**
     * Example Application
     */
    this.example.position.x = 0
    this.example.position.y = 0
    this.scene.add(this.example)
    this.scene.add(light)
    genParticle(this.scene, 1000)

    /**
     * EventHandler
     */
    this.listenerElement.addEventListener('click', this.handleClick)
    // this.controls.addEventListener('change', e => console.log(e)) // orbitControls debug
    /**
     * start animation loop
     */
    this.animate()
  }

  /**
   * ClickEventHandler
   */
  public handleClick(e: MouseEvent) {
    e.preventDefault()
    this.example.position.x = ((e.clientX - this.left) / this.width) * 2 - 1
    this.example.position.y = ((e.clientY - this.top) / this.height) * 2 + 1
    this.example.changeRotateRandom()
  }

  /**
   * handleEvent
   * use for worker.
   */
  public handleEventWorker(e: any) {
    if (!this.isOffscrenCanvas) {
      console.error('not offscreenCanvas')
      return
    }
    function noop() {}
    e.preventDefault = noop
    e.stopPropagation = noop

    this.listenerElement.dispatchEvent(e)
  }
  /**
   * animation behavior
   */
  public animate() {
    this.example.animate()
    this.renderer.render(this.scene, this.camera)
  }
}
