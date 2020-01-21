// refference: https://github.com/GoogleChromeLabs/comlink/blob/master/docs/examples/04-eventlistener-example/event.transferhandler.js
import * as Comlink from 'comlink'

Comlink.transferHandlers.set('event', {
  canHandle(obj) {
    return obj instanceof Event
  },
  serialize(obj) {
    return [
      {
        targetId: obj && obj.target && obj.target.id,
        targetClassList: obj &&
          obj.target &&
          obj.target.classList && [...obj.target.classList],
        detail: obj && obj.detail
      },
      []
    ]
  },
  deserialize(obj) {
    return obj
  }
})
