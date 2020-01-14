import * as Comlink from 'comlink'
import * as ExampleWorker from './example.worker'
import * as OffscreenCanvasWorker from './offscreencanvas.worker'
// TODO: Fix types error
// @ts-ignore
const Example: any = Comlink.wrap(new ExampleWorker())
// @ts-ignore
const OffscreenCanvas = Comlink.wrap(new OffscreenCanvasWorker())

const main = async () => {
  // Example
  // @ts-ignore
  const instance = await new Example()
  const text = await instance.test()
  console.log(text)

  // Offscreen canvas
  const htmlCanvas: HTMLCanvasElement = document.getElementById(
    'app'
  ) as HTMLCanvasElement
  const offscreen = htmlCanvas.transferControlToOffscreen()
  // @ts-ignore
  const offscreenCanvas = await new OffscreenCanvas()
  // @ts-ignore
  offscreenCanvas.debug(Comlink.transfer(offscreen, [offscreen]))
}

main()
