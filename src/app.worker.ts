import * as Comlink from 'comlink'
import App from './app'
import './shared/event.transferhandler'

Comlink.expose(App)
