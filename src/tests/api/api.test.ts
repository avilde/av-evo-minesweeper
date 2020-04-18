import { MineSweeperSocketService } from '../../api/MineSweeperService';

describe('MineSweeperService tests', () => {
  test('is instance of service', () => {
    expect(new MineSweeperSocketService()).toBeInstanceOf(
      MineSweeperSocketService
    );
  });
});
