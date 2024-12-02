const execSync = require('child_process').execSync;
const version = require('../package.json').version;

execSync(`dotenvx run -f ./.env.prod.sentry -- vite build`, { stdio: 'inherit' });
execSync(`dotenvx run  -f ./.env.prod.sentry -- sentry-cli releases new websocket-king-${version}`, { stdio: 'inherit' });
execSync(`dotenvx run  -f ./.env.prod.sentry -- sentry-cli releases files websocket-king-${version} upload-sourcemaps --ext js --ext map ./build`, { stdio: 'inherit' });
execSync(`dotenvx run  -f ./.env.prod.sentry -- sentry-cli releases finalize websocket-king-${version}`, { stdio: 'inherit' });


