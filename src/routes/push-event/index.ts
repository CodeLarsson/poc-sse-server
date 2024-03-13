import { Request, Response } from 'express';
import { StateHandler } from 'src/state-handler';

const stateHandler = StateHandler.getInstance();

export default function pushEventPost(req: Request, res: Response) {
  req.headers['Accept'] = 'application/json';
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  const data = req.body;
  console.log(data);
  stateHandler.add({ message: data.message, timestamp: Date.now() });
  res.sendStatus(200);
}
