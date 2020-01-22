// refference: https://github.com/GoogleChromeLabs/comlink/blob/master/docs/examples/04-eventlistener-example/event.transferhandler.js
import * as Comlink from 'comlink'

Comlink.transferHandlers.set('click', {
  canHandle(ev: any) {
    return ev instanceof Event
  },
  serialize(ev: MouseEvent) {
    const {
      target,
      offsetX,
      offsetY,
      clientX,
      clientY,
      pageX,
      pageY,
      screenX,
      screenY,
      x,
      y
    } = ev
    return [
      {
        // target,
        offsetX,
        offsetY,
        clientX,
        clientY,
        pageX,
        pageY,
        screenX,
        screenY,
        x,
        y
      },
      []
    ]
  },
  deserialize(ev) {
    return ev
  }
})
