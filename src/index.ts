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
  if (!htmlCanvas.transferControlToOffscreen) {
    console.info('Not support Offscreen Canvas')
    const app = new App({
      width,
      height,
      top,
      left,
      canvas: htmlCanvas,
      pixelRatio: window.devicePixelRatio
    })
    app.animate()
    htmlCanvas.addEventListener('click', app.handleClick)
    return
  }

  /**
   * OffScreen mode
   */
  console.info('Offscreen Canvas')
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
  app.animate()
  htmlCanvas.addEventListener('click', app.handleClick.bind(app))
}

init()
