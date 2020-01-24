export function get(key) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get([key], result => resolve(result[key]))
  })
}

export function set(key, value) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ [key]: value }, resolve)
  })
}

export const getTabs = () => get('tabs')

export const saveTabs = tabs => set('tabs', tabs)

export async function saveTab(tab) {
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
