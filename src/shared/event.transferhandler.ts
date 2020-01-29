// refference: https://github.com/GoogleChromeLabs/comlink/blob/master/docs/examples/04-eventlistener-example/event.transferhandler.js
import * as Comlink from 'comlink'

Comlink.transferHandlers.set('click', {
  canHandle(ev: any) {
    return ev instanceof Event
  },
  serialize(ev: MouseEvent & TouchEvent & WheelEvent & KeyboardEvent) {
    const {
      x,
      y,
      // target,
      offsetX,
      offsetY,
      clientX,
      clientY,
      movementX,
      movementY,
      pageX,
      pageY,
      screenX,
      screenY,
      touches,
      deltaX,
      deltaY,
      keyCode,
      type
    } = ev
    return [
      {
        x,
        y,
        type,
        // target,
        offsetX,
        offsetY,
        clientX,
        clientY,
        movementX,
        movementY,
        pageX,
        pageY,
        screenX,
        screenY,
        touches,
        deltaX,
        deltaY,
        keyCode,
        detail: ev && ev.detail
      },
      []
    ]
  },
  deserialize(ev) {
    return ev
  }
})
