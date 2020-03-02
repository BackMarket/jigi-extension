type StorageShimChangedCallback = (
  changes: {
    [key: string]: chrome.storage.StorageChange
  },
  areaName: string,
) => void

type StorageShimArea = Omit<
  chrome.storage.StorageArea,
  'managed' | 'getBytesInUse' | 'getBytesInUse' | 'clear' | 'remove'
>

type StorageShimAreaKeys = string | Object | string[] | null
type StorageShimAreaCallback = (items: { [key: string]: any }) => void

type StorageChangedEventShim = Omit<
  chrome.storage.StorageChangedEvent,
  'getRules' | 'addRules' | 'removeRules' | 'hasListener' | 'hasListeners'
>

const STORAGE_CALLBACKS: StorageShimChangedCallback[] = []

function storageKeys(keys: string | string[] | Object) {
  if (typeof keys === 'string') {
    return [keys]
  }
  return Array.isArray(keys) ? keys : Object.keys(keys)
}

export function makeStorageAreaShim(
  prefix = '',
  callbacks: StorageShimChangedCallback[],
  localStorage: Storage,
): StorageShimArea {
  const fullKey = (key: string) => `${prefix}${key}`

  function get(
    keys: StorageShimAreaKeys | StorageShimAreaCallback,
    callback?: StorageShimAreaCallback,
  ) {
    if (keys === null || callback === undefined) {
      throw new TypeError(
        'Retreiving all storage keys is not supported by shim',
      )
    }
    const values = storageKeys(keys).reduce((acc, key) => {
      return {
        ...acc,
        [key]: JSON.parse(localStorage.getItem(fullKey(key)) || 'null'),
      }
    }, {})
    setImmediate(() => callback(values))
  }

  function set(items: Object, callback?: (() => void) | undefined): void {
    Object.entries(items).forEach(([key, value]) => {
      localStorage.setItem(fullKey(key), JSON.stringify(value))
    })

    const allCallbacks =
      callback === undefined ? callbacks : [callback, ...callbacks]
    allCallbacks.forEach(cb => window.setImmediate(cb))
  }

  return { get, set }
}

const onChanged: StorageChangedEventShim = {
  addListener(callback: StorageShimChangedCallback) {
    if (!STORAGE_CALLBACKS.includes(callback)) {
      STORAGE_CALLBACKS.push(callback)
    }
  },

  removeListener(callback: StorageShimChangedCallback) {
    const index = STORAGE_CALLBACKS.findIndex(value => value === callback)
    if (index !== -1) {
      STORAGE_CALLBACKS.splice(index, 1)
    }
  },
}

export default {
  sync: makeStorageAreaShim('sync.', STORAGE_CALLBACKS, window.localStorage),
  local: makeStorageAreaShim('local.', STORAGE_CALLBACKS, window.localStorage),
  onChanged,
}
