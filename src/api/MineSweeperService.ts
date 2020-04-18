import { MINESWEEPER_SOCKET_URI, MineSweeperEventNames } from './constants';
import { fromEvent, Observable } from 'rxjs';

export class MineSweeperSocketService {
  constructor(
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket
  ) {}

  public disconnect() {
    this.socket.disconnect();
  }

  init = () => {
    this.socket = io(MINESWEEPER_SOCKET_URI);

    return this;
  };

  onMessage(): Observable<string> {
    return fromEvent(this.socket, MineSweeperEventNames.MESSAGE);
  }

  send = (message: string) => {
    this.socket?.emit(MineSweeperEventNames.MESSAGE, message);
  };
}
