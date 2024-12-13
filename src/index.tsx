import 'reflect-metadata'
import { render } from 'react-dom'
import { App } from './App'
import './styles/styles.scss'
import { applicationMode } from '~/environment'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// custom polyfill to provide 'global'
if (typeof (window as any).global === 'undefined') {
  ;(window as any).global = window
}

const mode = applicationMode()
if (mode === 'PROD') {
  disableReactDevTools()
}

/**
 * INITIALISATION FUNCTION
 */
function init() {
  render(<App />, document.getElementById('init'))
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
