const path = require('path');
const { Hono } = require('hono');
const { serveStatic } = require('@hono/node-server/serve-static');
const { serve } = require('@hono/node-server');

const app = new Hono();

const publicDir = path.join(__dirname, 'public');

app.use('/*', serveStatic({ root: publicDir }));

app.get('/', (c) => {
    const fs = require('fs');
    return c.html(fs.readFileSync(path.join(publicDir, 'index.html'), 'utf-8'));
});

const port = 3000;
serve({ fetch: app.fetch, port });

console.log(`Running at http://localhost:${port}`);
