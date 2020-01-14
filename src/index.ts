import * as Comlink from 'comlink'
import * as ExampleWorker from './example.worker'

// TODO: Fix types error
// @ts-ignore
const Example: any = Comlink.wrap(new ExampleWorker())

const main = async () => {
  const instance = await new Example()
  const text = await instance.test()
  console.log(text)
}

main()
