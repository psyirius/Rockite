import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import "./styles/globals.scss";
import App from './App';
import env from './helpers/env';

if (env('SENTRY_DSN')) {
  Sentry.init({
    dsn: env('SENTRY_DSN') as string,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
    ],
  });
}

createRoot(document.getElementById('root')!)
    .render(<App />);

if (env('GOOGLE_ANALYTICS_ID')) {
  ReactGA.initialize(env('GOOGLE_ANALYTICS_ID') as string);
  ReactGA.pageview(window.location.pathname + window.location.search);
}
