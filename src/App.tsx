import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TileColors } from './constants';
import styled from '@emotion/styled';
import marble from './static/63511.jpg';
import tileBg from './static/281.jpg';
import { flatten, cloneDeep } from 'lodash';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${tileBg});
  background-size: cover;
  h1 {
    color: #ecf0f1;
    background: #95a5a6;
    padding: .5em;
  }
  .game-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    justify-content: space-evenly;
  }
`;

const StyledBoard = styled.div`
  display: grid;
  border-style: outset;
  height: 750px;
  width: 750px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 10px;
  background: url(${marble});
  background-size: cover;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .Azul-tile {
    background: powderblue;
  }
  .Black-tile {
    background: black;
  }
  .Red-tile {
    background: orangered;
  }
  .Yellow-tile {
    background: gold;
  }
  .LightBlue-tile {
    background: deepskyblue;
  }
  .tile {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-style: outset;
  }
`;

type XYCoord = [number, number]; // x
type TileLocations = XYCoord[];

const LIGHT_BLUE_TILE_LOCATIONS: TileLocations = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4]
];
const YELLOW_TILE_LOCATIONS: TileLocations = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0]
];
const AZUL_TILE_LOCATIONS: TileLocations = [
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [0, 4]
];
const RED_TILE_LOCATIONS: TileLocations = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 0],
  [4, 1]
];
const BLACK_TILE_LOCATIONS: TileLocations = [
  [0, 3],
  [1, 4],
  [2, 0],
  [3, 1],
  [4, 2]
];

const TILE_MAPPING = {
  [TileColors.LightBlue]: LIGHT_BLUE_TILE_LOCATIONS,
  [TileColors.Azul]: AZUL_TILE_LOCATIONS,
  [TileColors.Yellow]: YELLOW_TILE_LOCATIONS,
  [TileColors.Black]: BLACK_TILE_LOCATIONS,
  [TileColors.Red]: RED_TILE_LOCATIONS
};

const generateBoard = () => {
  let board: any[][] = [];
  for (let i = 0; i < 5; i++) {
    board.push(new Array(5));
  }

  Object.values(TILE_MAPPING).forEach((v, i) => {
    v.forEach(([x, y]) => {
      board[x][y] = new TileLocation(TileColors[i], x, y);
    });
  });

  return board;
};

class TileLocation {
  public type: string;
  public isOccupied: boolean;
  public className: string;
  public xCoord: number;
  public yCoord: number;
  public turnPlaced: number | null;
  constructor(type: string, xCoord: number, yCoord: number, isOccupied=false, turn=null) {
    this.type = type;
    this.isOccupied = isOccupied;
    this.className = `${type}-tile`;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.turnPlaced = turn
  }
}

type Row = TileLocation[];
type Board = Row[];

const Tile = styled.div<{ tile: TileLocation }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: ${({ tile }) => (tile.isOccupied ? 1 : 0.3)};
`;

interface placeTile {
  coords: XYCoord
  board: Board
  turn: number
  setBoard: setBoard
}

const placeTile = ({
  coords: [coordX, coordY],
  board,
  setBoard,
  turn
}: placeTile) => {
  const newBoard = cloneDeep(board)
  const { type, isOccupied } = board[coordX][coordY]
  const newTile = new TileLocation(type, coordX, coordY, !isOccupied)
  newBoard[coordX][coordY] = newTile
  setBoard(newBoard)
}

type setBoard = (board:Board) => void
type setTurn = (turn: number) => void
const resetBoard = (setBoard: setBoard, setTurn: setTurn) => {
  setTurn(1)
  setBoard(generateBoard())
}
const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(generateBoard());
  const [turn, setTurn] = useState<number>(1);
  return (
    <StyledApp>
      <h1>Definitely Not That Other Tile Game</h1>
      <h3>Current Turn: {turn}</h3>
      <StyledBoard>
        {flatten(board).map(tile => (
          <Tile
            className={`${tile.className} tile`}
            key={`${tile.xCoord}-${tile.yCoord}`}
            onClick={() => placeTile({
              coords: [tile.xCoord, tile.yCoord],
              board,
              turn,
              setBoard,
            })}
            tile={tile}
          />
        ))}
      </StyledBoard>
      <section className='game-buttons'>
        <button onClick={() => setTurn(turn + 1)}>Advance Turn</button>
        <button onClick={() => resetBoard(setBoard, setTurn)}>Reset Board</button>
      </section>
    </StyledApp>
  );
};

export default App;
