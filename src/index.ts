// TODO: Fix types error
import * as Comlink from 'comlink'
import Stats from 'stats.js'
import App from './app'
import * as AppWorker from './app.worker'
import './shared/event.transferhandler'

/**
 * animation
 * @param {() => void} cb animation update render
 */
const startAnmation = (update: () => void) => {
  const stats = new Stats()
  document.body.appendChild(stats.dom)

  const animate = () => {
    if (self.requestAnimationFrame) {
      self.requestAnimationFrame(animate)
    } else {
      // Firefox
    }
    stats.begin()
    update()
    stats.end()
  }
  animate()
}

/**
 * normal App
 */
const renderApp = async (htmlCanvas: HTMLCanvasElement) => {
  const { width, height, top, left } = htmlCanvas.getBoundingClientRect()
  const app = new App({
    width,
    height,
    top,
    left,
    canvas: htmlCanvas,
    pixelRatio: window.devicePixelRatio
  })
  startAnmation(app.animate)
}

const renderOffscreenApp = async (htmlCanvas: HTMLCanvasElement) => {
  const { width, height, top, left } = htmlCanvas.getBoundingClientRect()
  // @ts-ignore
  const offscreen = htmlCanvas.transferControlToOffscreen()
  // @ts-ignore
  const OffscreenApp = Comlink.wrap(new AppWorker())
  // @ts-ignore
  const app = await new OffscreenApp(
    Comlink.transfer(
      {
        width,
        height,
        top,
        left,
        canvas: offscreen,
        pixelRatio: window.devicePixelRatio
      },
      // @ts-ignore
      [offscreen]
    )
  )
  startAnmation(app.animate)

  /**
   * worker eventListener
   */
  const eventType: Array<keyof GlobalEventHandlersEventMap> = [
    'click',
    'contextmenu',
    'mousedown',
    'mousemove',
    'mouseup',
    'touchstart',
    'touchmove',
    'touchend',
    'wheel',
    'keydown'
  ]
  eventType.map((type: keyof GlobalEventHandlersEventMap, index: number) => {
    htmlCanvas.addEventListener(type, app.handleEventWorker.bind(app))
  })
}

const init = async () => {
  const el = document.getElementById('app') as HTMLCanvasElement
  const title = document.getElementById('title') as HTMLElement
  if (location.search.includes('?no_offscreen')) {
    title.innerHTML = 'NORMAL APP'
    renderApp(el)
    return
  }
  // @ts-ignore
  if (el.transferControlToOffscreen) {
    title.innerHTML = 'OFFSCREEN CANVAS APP'
    await renderOffscreenApp(el)
  }
}

init()
