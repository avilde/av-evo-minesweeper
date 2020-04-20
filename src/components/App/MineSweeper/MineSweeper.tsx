import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../../api/MineSweeperContext';
import MineGrid, { Cell } from './MineGrid/MineGrid';
import classes from './MineSweeper.module.sass';
import classNames from 'classnames';

const MineSweeper = () => {
  const subject = useContext(MineSweeperContext);
  const [, setMessages] = useState<string[]>([]);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    subject.connect();

    const onMessageSubscriber = {
      next: (message: string) => {
        if (message.startsWith('map')) {
          message = message.replace('map:\n', '');

          const newGrid = message
            .split(String.fromCharCode(10))
            .reduce((result: Cell[][], row: string, rowIndex: number) => {
              const newRow = [
                ...row
                  .split('')
                  .reduce((r: Cell[], char: string, columnIndex: number) => {
                    r.push({
                      row: rowIndex,
                      col: columnIndex,
                      open: char.charCodeAt(0) !== 9633,
                      flag: grid.length > 0 && grid[columnIndex][rowIndex].flag,
                      value: char,
                    });

                    return r;
                  }, []),
              ];
              if (newRow.length > 0) {
                result.push(newRow);
              }

              return result;
            }, []);

          console.log(newGrid);

          setGrid(newGrid);
        }

        if (message.includes('You lose')) {
          setGameOver(true);
        }

        return setMessages((m) => [...m, message]);
      },
    };

    subject.subscribe(onMessageSubscriber);

    return () => subject.disconnect();
  }, [subject]);

  const newGame = (level: number) => {
    gameOver && setGameOver(false);
    subject.sendMessage(`new ${level}`);
    subject.sendMessage('map');
  };

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: number,
    column: number
  ) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
      setGrid((grid) => {
        const newGrid = [...grid];
        newGrid[row][column].flag = !newGrid[row][column].flag;

        return newGrid;
      });
    } else {
      subject.sendMessage(`open ${row} ${column}`);
      subject.sendMessage('map');
    }
  };

  return (
    <div className={classes.MineSweeper}>
      <div className={classes.Controls}>
        <button onClick={() => newGame(1)}>New Level 1</button>
        <button onClick={() => newGame(2)}>New Level 2</button>
        <button onClick={() => newGame(3)}>New Level 3</button>
        <button onClick={() => newGame(4)}>New Level 4</button>
        <span
          className={classNames(
            classes.GameOver,
            gameOver ? null : classes.Hidden
          )}
        >
          Game Over
        </span>
      </div>

      <MineGrid grid={grid} onCellClick={handleCellClick} />
    </div>
  );
};

export default MineSweeper;
