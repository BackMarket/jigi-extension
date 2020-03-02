import { alarms, runtime, storage } from './lib/chrome-extension-shim'

async function background() {
  let { counter = 0 } = await new Promise(resolve =>
    storage.local.get(['counter'], resolve),
  )

  console.log('Background script loaded')
  console.log('Counter:', counter)

  alarms.create({ delayInMinutes: 1 / 60 })

  alarms.onAlarm.addListener(async () => {
    counter += 1
    await new Promise(resolve => storage.local.set({ counter }, resolve))
    console.log('Incremented counter:', counter)
  })
}

runtime.onStartup.addListener(background)

export default null
