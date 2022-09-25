import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App'
import theme from './theme'
import * as Mock from './data/mock'
import * as Store from './store'
import './index.css'

const root: HTMLElement = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Mock.Provider>
      <Store.Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Store.Provider>
    </Mock.Provider>
  </React.StrictMode>
)
