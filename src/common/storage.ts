import { Tab } from '../../types'

// TODO @amercier Cross-browser support
const syncStorage = chrome.storage.sync

export function get(key: string): Promise<any> {
  return new Promise(resolve => {
    syncStorage.get({ key }, resolve)
  })
}

export function set(key: string, value: any): Promise<void> {
  return new Promise(resolve => {
    syncStorage.set({ [key]: value }, resolve)
  })
}

export const getTabs = () => get('tabs')

export async function saveTab(tab: Tab) {
  const tabs = await getTabs()
  return set('tags', { ...tabs, [tab.id]: tab })
}
