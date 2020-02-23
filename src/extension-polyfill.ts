// When browser loads an extension, it automatically loads its background
// script, when defined in `manifest.json`. First, we create a new chunk that we
// manually name "background", so it is build as `build/js/background.js`.
// Second, we inject it manually in development mode. Note: we need to create a
// separate variable, so Webpack doesn't ignore the chunk altogether.
const injectBackgroundScript = process.env.NODE_ENV === 'development'
if (injectBackgroundScript) {
  import(/* webpackChunkName: "background" */ './background').catch(error => {
    // eslint-disable-next-line no-console
    console.error('Error while loading background script:', error)
  })
}

export default null
