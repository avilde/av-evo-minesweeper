import React from 'react';
import { MineSweeperSocketService } from './MineSweeperService';

export const MineSweeperContext: React.Context<MineSweeperSocketService> = React.createContext(
  new MineSweeperSocketService()
);
