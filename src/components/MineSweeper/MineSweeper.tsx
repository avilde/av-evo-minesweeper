import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../api/MineSweeperContext';

const MineSweeper = () => {
  const subject = useContext(MineSweeperContext);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    subject.connect();

    const onMessageSubscriber = {
      next: (message: string) =>
        setTimeout(() => {
          setMessages([...messages, message]);
        }),
    };

    subject.subscribe(onMessageSubscriber);

    return () => subject.disconnect();
  }, []);

  subject.sendMessage('help');

  return <div>{messages}</div>;
};

export default MineSweeper;
