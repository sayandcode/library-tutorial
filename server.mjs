import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady } from '@remix-run/node';
import * as build from './build/index.js';

const app = express();

app.use(express.static('public'));

app.all('*', createRequestHandler({ build }));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});
