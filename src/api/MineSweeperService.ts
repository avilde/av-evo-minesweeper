import { MINESWEEPER_ENDPOINT_URI } from './constants';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import { NextObserver } from 'rxjs';

export class MineSweeperSocketService {
  constructor(private subject: WebSocketSubject<string> | null = null) {}

  private onError = (error: string) => console.error(error);

  private onClose = () => {
    console.log('DISCONNECTED');
  };

  private onMessage = (message: string) => console.log(message);

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
