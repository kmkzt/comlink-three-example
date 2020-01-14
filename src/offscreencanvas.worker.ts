import * as Comlink from 'comlink'

class OffscreenCanvas {
  public debug(canvas: any) {
    console.log(canvas)
  }
}

Comlink.expose(OffscreenCanvas)
