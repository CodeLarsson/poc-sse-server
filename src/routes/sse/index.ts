import { Request, Response } from 'express';
import { StateHandler } from 'src/state-handler';

const stateHandler = StateHandler.getInstance();

export default function sseGet(req: Request, res: Response) {
  let lastEventTimestamp = 0;

  const checkState = () => {
    const state = stateHandler.getLatest() ?? {
      timestamp: 0,
      message: 'Initial state',
    };
    const fifteenSeconds = 15000;

    if (state.timestamp > lastEventTimestamp - fifteenSeconds) {
      lastEventTimestamp = state.timestamp;
      send(res, JSON.stringify(state), 'ping');
      lastEventTimestamp = state.timestamp + fifteenSeconds;
    } else if (Date.now() > lastEventTimestamp) {
      send(res, JSON.stringify(state), 'ping');
      lastEventTimestamp = Date.now() + fifteenSeconds;
    }
  };

  const interval = setInterval(checkState, 1000);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  req.on('close', () => {
    clearInterval(interval);
  });
}

const send = (res: Response, data: string, eventName: string) =>
  res.write(`event: ${eventName}\ndata: ${data}\n\n`);
