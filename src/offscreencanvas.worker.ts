import three from 'three'
import * as Comlink from 'comlink'
import init from './scene'
class OffscreenCanvas {
  public renderer({
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
    console.log(canvas)
    init(canvas, { width, height, pixelRatio })
  }
}

Comlink.expose(OffscreenCanvas)
