import { MINESWEEPER_ENDPOINT_URI } from './constants';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import { NextObserver } from 'rxjs';
import { debug } from '../utils/commonUtils';

export class MineSweeperSocketService {
  constructor(private subject: WebSocketSubject<string> | null = null) {}

  private onError = (error: string) => debug('api error', error);

  private onClose = () => {
    debug('api', 'disconnected');
  };

  private onMessage = (message: string) => debug('api message', message);

  private webSocketConfig = {
    url: MINESWEEPER_ENDPOINT_URI,
    serializer: (value: string) => value,
    deserializer: ({ data }: MessageEvent) => data,
  } as WebSocketSubjectConfig<string>;

  connect = () => {
    this.subject = webSocket<string>(this.webSocketConfig);

    this.subject.subscribe(
      (msg) => this.onMessage(msg),
      (error) => this.onError(error),
      () => this.onClose()
    );

    return this;
  };

  disconnect = () => {
    this.subject?.unsubscribe();
  };

  subscribe = (observer: NextObserver<string>) =>
    this.subject?.subscribe(observer);

  sendMessage = (message: string) => this.subject?.next(message);
}
