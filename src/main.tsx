import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga'
import './styles/globals.scss'
import App from './App'
import env from './helpers/env'

createRoot(document.getElementById('app')!).render(<App />)

if (env('GOOGLE_ANALYTICS_ID')) {
  ReactGA.initialize(env('GOOGLE_ANALYTICS_ID') as string)
  ReactGA.pageview(window.location.pathname + window.location.search)
}
