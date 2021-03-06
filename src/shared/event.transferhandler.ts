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
      deltaX,
      deltaY,
      keyCode,
      type,
      ctrlKey,
      shiftKey,
      button
    } = ev
    const touches =
      (ev?.touches &&
        Array(ev.touches).map(({ pageX, pageY }: any) => ({ pageX, pageY }))) ||
      []
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
        detail: ev && ev.detail,
        ctrlKey,
        shiftKey,
        button
      },
      []
    ]
  },
  deserialize(ev) {
    return ev
  }
})
