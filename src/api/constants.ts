export const MINESWEEPER_ENDPOINT_URI = 'wss://hometask.eg1236.com/game1/';
export const SOCKET_PATH = '/game1/';

export enum SocketEventNames {
  CLOSE = 'close',
  ERROR = 'error',
  MESSAGE = 'message',
  OPEN = 'open',
}

export enum SocketStatus {
  CREATED = 0,
  CONNECTED = 1,
  CLOSED = 2,
  ERROR = 3,
}

export enum MapCharacterCode {
  LINE_FEED = 10,
  WHITE_BLOCK = 9633,
}

export enum MapValue {
  WHITE_BLOCK = '□',
  BOMB = '*',
  ZERO = '០',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
}

export const uiValuesMapping = {
  [MapValue.WHITE_BLOCK]: '',
  [MapValue.BOMB]: '💣',
  [MapValue.ZERO]: '0',
  [MapValue.ONE]: '1',
  [MapValue.TWO]: '2',
  [MapValue.THREE]: '3',
  [MapValue.FOUR]: '4',
  [MapValue.FIVE]: '5',
  [MapValue.SIX]: '6',
};

export enum Mode {
  DEFAULT = 'default',
  FLAG = 'flag',
  QUESTION = 'question',
}

export const modeUiMapping = {
  [Mode.DEFAULT]: '💣',
  [Mode.FLAG]: '🚩',
  [Mode.QUESTION]: '❓',
};

export const getUiCharacter = (value: MapValue) => {
  if (value in uiValuesMapping) {
    return uiValuesMapping[value];
  } else {
    return value;
  }
};

export enum MineSweeperCommand {
  HELP = 'help',
  MAP = 'map',
  NEW = 'new',
  OPEN = 'open',
}

export enum MineSweeperResponse {
  MAP = 'map',
  YOU_LOST = 'you lose',
  YOU_WIN = 'you win',
}

export enum MineSweeperLevel {
  EASY = 1,
  NORMAL = 2,
  HARD = 3,
  EXPERT = 4,
}
