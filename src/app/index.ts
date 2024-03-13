import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { pushEventPost, sseGet } from '../routes';

export const app: Express = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html');
});

app.get('/sse', sseGet);
app.post('/push-event', pushEventPost);
