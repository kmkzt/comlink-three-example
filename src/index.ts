// TODO: Fix types error
import * as Comlink from 'comlink'
import App from './app'
import * as AppWorker from './app.worker'
import './shared/event.transferhandler'

const init = async () => {
  // Offscreen canvas
  const htmlCanvas: HTMLCanvasElement = document.getElementById(
    'app'
  ) as HTMLCanvasElement

  const { width, height, top, left } = htmlCanvas.getBoundingClientRect()
  /**
   * Not Support OffScreen mode
   */
  if (
    // @ts-ignore
    !htmlCanvas.transferControlToOffscreen ||
    location.search.includes('?no_offscreen')
  ) {
    console.info('Not support Offscreen Canvas')
    const app = new App({
      width,
      height,
      top,
      left,
      canvas: htmlCanvas,
      pixelRatio: window.devicePixelRatio
    })

    return
  }

  /**
   * OffScreen mode
   */
  console.info('Offscreen Canvas')
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

init()
