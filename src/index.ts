// TODO: Fix types error
import * as Comlink from 'comlink'
import * as OffscreenCanvasWorker from './offscreencanvas.worker'
// @ts-ignore
const OffscreenCanvas = Comlink.wrap(new OffscreenCanvasWorker())

const init = async () => {
  // Offscreen canvas
  const htmlCanvas: HTMLCanvasElement = document.getElementById(
    'app'
  ) as HTMLCanvasElement
  const offscreen = htmlCanvas.transferControlToOffscreen()
  // @ts-ignore
  const offscreenCanvas = await new OffscreenCanvas()
  // @ts-ignore
  offscreenCanvas.renderer(
    Comlink.transfer(
      {
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio
      },
      [offscreen]
    )
  )
}

init()
