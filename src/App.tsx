import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { TileColors } from './constants'
import styled from '@emotion/styled'
import marble from './static/63511.jpg'
import tileBg from './static/281.jpg'
import {flatten} from 'lodash'

const StyledApp = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${tileBg});
  background-size: cover;
`

const StyledBoard = styled.div`
  display: grid;
  height: 750px;
  width: 750px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 10px;
  background: url(${marble});
  background-size: cover;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  .Azul-tile{
    background: powderblue;
  }
  .Black-tile{
    background: black;
  }
  .Red-tile{
    background: orangered;
  }
  .Yellow-tile{
    background: gold;
  }
  .LightBlue-tile{
    background: deepskyblue;
  }
  .tile {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`

type TileXYCoord = [number, number] // x
type TileLocations = TileXYCoord[]

const LIGHT_BLUE_TILE_LOCATIONS: TileLocations = [
  [0,0], [1,1], [2,2], [3,3], [4,4]
]
const YELLOW_TILE_LOCATIONS: TileLocations = [
  [0,1], [1,2], [2,3], [3,4], [4,0]
]
const AZUL_TILE_LOCATIONS: TileLocations = [
  [1,0], [2,1], [3,2], [4,3], [0,4]
]
const RED_TILE_LOCATIONS: TileLocations = [
  [0,2], [1,3], [2,4], [3,0], [4,1]
]
const BLACK_TILE_LOCATIONS: TileLocations = [
  [0,3], [1,4], [2,0], [3,1], [4,2]
]

const TILE_MAPPING = {
  [TileColors.LightBlue]: LIGHT_BLUE_TILE_LOCATIONS,
  [TileColors.Azul]: AZUL_TILE_LOCATIONS,
  [TileColors.Yellow]: YELLOW_TILE_LOCATIONS,
  [TileColors.Black]: BLACK_TILE_LOCATIONS,
  [TileColors.Red]: RED_TILE_LOCATIONS
}

const GenerateBoard = () => {
  let board: any[][] = []
  for(let i = 0; i < 5; i++){
    board.push(new Array(5))
  }

  Object.entries(TILE_MAPPING).forEach(([k, v], i) => {
    v.forEach(([x, y]) => {
      board[x][y] = new TileLocation(TileColors[i], x, y)
    })
  })

  return board
}

class TileLocation {
  public type: string
  public isOccupied: boolean
  public className: string
  public xCoord: number
  public yCoord: number
  constructor(type: string, xCoord: number, yCoord: number) {
    this.type = type
    this.isOccupied = false
    this.className = `${type}-tile`
    this.xCoord = xCoord
    this.yCoord = yCoord
  }
}

type Row = TileLocation[]
type Board = Row[]

const Tile = styled.div<{tile: TileLocation}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: ${({tile}) => tile.isOccupied ? 1 : .7}
`

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(GenerateBoard())
  return (
    <StyledApp>
      <h1>Definitely Not That Other Tile Game</h1>
      <StyledBoard>
        {
          flatten(board).map((tile) => (
            <Tile className={`${tile.className} tile`} key={`${tile.xCoord}-${tile.yCoord}`} tile={tile}>
              <p>{tile.className.toLowerCase()}</p>
              <p>{`${tile.xCoord}-${tile.yCoord}`}</p>
            </Tile>
          ))
        }
      </StyledBoard>
    </StyledApp>
  );
}

export default App;
