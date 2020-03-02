import React, { useState, useEffect } from 'react'
import { storage } from './lib/chrome-extension-shim'
import logo from './logo.svg'
import './App.css'

function useSyncStorage(callback: (changes: any) => void) {
  useEffect(() => {
    storage.onChanged.addListener(callback)
    return () => storage.onChanged.removeListener(callback)
  })
}

function useStoredCounter() {
  const [counter, setCounter] = useState(0)
  useSyncStorage((changes: any) => {
    if (changes.counter) {
      setCounter(changes.counter.newValue)
    }
  })
  return counter
}

const App = () => {
  const counter = useStoredCounter()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        loads = {counter}
      </header>
    </div>
  )
}

export default App
