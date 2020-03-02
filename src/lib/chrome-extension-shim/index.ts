import alarmsShim from './alarms'
import runtimeShim from './runtime'
import storageShim from './storage'

// TODO: cross-browser support
const { chrome } = window

export const alarms =
  process.env.NODE_ENV === 'development' ? alarmsShim : chrome.alarms

export const runtime =
  process.env.NODE_ENV === 'development' ? runtimeShim : chrome.runtime

export const storage =
  process.env.NODE_ENV === 'development' ? storageShim : chrome.storage
