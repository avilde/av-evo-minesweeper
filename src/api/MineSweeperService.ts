import { MINESWEEPER_ENDPOINT_URI } from './constants';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import { NextObserver, Observable, Observer } from 'rxjs';
import { share, distinctUntilChanged } from 'rxjs/operators';
import { _debug } from '../utils/commonUtils';

export enum SocketStatus {
  CREATED = 0,
  CONNECTED = 1,
  CLOSED = 2,
  ERROR = 3,
}

export class MineSweeperSocketService {
  constructor(
    private connectionObserver: Observer<number> | null = null,
    public socketStatus: Observable<number> | null = null,
    private socket: WebSocketSubject<string> | null = null
  ) {
    this.socketStatus = new Observable((observer: Observer<number>) => {
      this.connectionObserver = observer;
      this.connectionObserver.next(SocketStatus.CREATED);
    })
      .pipe(share())
      .pipe(distinctUntilChanged());
  }

  private onMessageError = (error: string) => {
    this.connectionObserver?.next(SocketStatus.ERROR);
    _debug('api error', error);
  };

  private closeObserver = {
    next: (event: CloseEvent) => {
      this.connectionObserver?.next(SocketStatus.CLOSED);
      _debug('api', 'disconnected');
    },
  };

  private openObserver = {
    next: (value: Event) => {
      this.connectionObserver?.next(SocketStatus.CONNECTED);
      _debug('api', 'connected', value);
    },
  };

  private messageSerializer = (value: string) => value;

  private messageDeserializer = ({ data }: MessageEvent) => data;

  private onMessage = (message: string) => _debug('api message', message);

  private webSocketConfig = {
    url: MINESWEEPER_ENDPOINT_URI,
    closeObserver: this.closeObserver,
    openObserver: this.openObserver,
    serializer: this.messageSerializer,
    deserializer: this.messageDeserializer,
  } as WebSocketSubjectConfig<string>;

  connect = () => {
    this.socket = webSocket<string>(this.webSocketConfig);

    this.socket.subscribe(
      (msg) => this.onMessage(msg),
      (error) => this.onMessageError(error)
    );

    return this;
  };

  onDisconnect = (cb?: Function) => {
    this.socket?.unsubscribe();

    if (typeof cb === 'function') {
      cb();
    }
  };

  subscribe = (observer: NextObserver<string>) =>
    this.socket?.subscribe(observer);

  sendMessage = (message: string) => this.socket?.next(message);
}
