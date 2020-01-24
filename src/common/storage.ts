import { Tab } from '../../types'

export function get(key: string): Promise<any> {
  return new Promise(resolve => {
    chrome.storage.local.get([key], (result: any) => resolve(result[key]))
  })
}

export function set(key: string, value: any): Promise<void> {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, resolve)
  })
}

export const getTabs = () => get('tabs')

export async function saveTab(tab: Tab) {
  const tabs = await getTabs()
  await set('tabs', {
    ...tabs,
    [tab.id]: {
      ...tab,
      githubClient: null,
      jiraClient: null,
      showSettings: false,
    },
  })
}
