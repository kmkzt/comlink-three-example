import * as Comlink from 'comlink'
// importScripts("../../../dist/umd/comlink.js");

class Example {
  public test() {
    return 'OK!!'
  }
}

Comlink.expose(Example)
