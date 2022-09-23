import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme'
import * as Mock from './mock'
import './index.css'

const root: HTMLElement = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Mock.Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Mock.Provider>
  </React.StrictMode>
)
