import React, { useState } from 'react'
import './App.css'
import { TileColors } from './constants'
import { flatten, cloneDeep } from 'lodash'
import StyledApp from './styled-components/StyledApp'
import StyledBoard from './styled-components/StyledBoard'
import StyledStaging from './styled-components/StyledStaging'
import { XYCoord } from './types/tiles'
import { Board } from './types/board'
import { TILE_MAPPING } from './constants/tiles'
import { Tile } from './styled-components/StyledTile';

const generateBoard = () => {
	let board: any[][] = []
	for (let i = 0; i < 5; i++) {
		board.push(new Array(5))
	}

	Object.values(TILE_MAPPING).forEach((v, i) => {
		v.forEach(([ x, y ]) => {
			board[x][y] = new TileLocation(TileColors[i], x, y)
		})
	})

	return board
}

const generateStaging = () => {
  type row = any
  let board: row[] = []
  
  for (let i = 0; i < 5; i++) {
		board.push(new Array(5))
  }
  
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (4 - y <= x) {
        board[y][x] = new TileLocation('blank', x, y)
      } else {
        board[y][x] = null
      }
    }
  }

  console.log({board})
  return board
}

export class TileLocation {
	public type: string
	public isOccupied: boolean
	public className: string
	public xCoord: number
	public yCoord: number
	public turnPlaced: number | null
	constructor(type: string, xCoord: number, yCoord: number, isOccupied = false, turn = null) {
		this.type = type
		this.isOccupied = isOccupied
		this.className = `${type}-tile`
		this.xCoord = xCoord
		this.yCoord = yCoord
		this.turnPlaced = turn
	}
}

interface placeTile {
	coords: XYCoord
	board: Board
	turn: number
	setBoard: React.Dispatch<React.SetStateAction<Board>>
}

const placeTile = ({ coords: [ coordX, coordY ], board, setBoard, turn }: placeTile) => {
	const newBoard = cloneDeep(board)
	const { type, isOccupied } = board[coordX][coordY]
	const newTile = new TileLocation(type, coordX, coordY, !isOccupied)
	newBoard[coordX][coordY] = newTile
	setBoard(newBoard)
}

const App: React.FC = () => {
  const [ board, setBoard ] = useState<Board>(generateBoard())
  const [ staging, setStaging ] = useState<Board>(generateStaging())
  const [ turn, setTurn ] = useState<number>(1)
  
  const resetBoard = () => {
    setTurn(1)
    setBoard(generateBoard())
  }
	return (
		<StyledApp>
			<div className="title">
				<h3>Definitely Not That Other Tile Game</h3>
				<h5>Current Turn: {turn}</h5>
			</div>
			<div className="staging-area">
				<StyledStaging>
        {flatten(staging).map((tile) => tile ? (
						<Tile
							className={`${tile.className} tile`}
							key={`${tile.xCoord}-${tile.yCoord}`}
							onClick={() =>
								placeTile({
									coords: [ tile.xCoord, tile.yCoord ],
									board,
									turn,
									setBoard
								})}
							tile={tile}
						/>) : <span />
					)}
        </StyledStaging>
			</div>
			<div className="board-area">
				<StyledBoard>
					{flatten(board).map((tile) => (
						<Tile
							className={`${tile.className} tile`}
							key={`${tile.xCoord}-${tile.yCoord}`}
							onClick={() =>
								placeTile({
									coords: [ tile.xCoord, tile.yCoord ],
									board,
									turn,
									setBoard
								})}
							tile={tile}
						/>
					))}
				</StyledBoard>
			</div>
			<section className="game-buttons">
				<button onClick={() => setTurn(turn + 1)}>Advance Turn</button>
				<button onClick={() => resetBoard()}>Reset Board</button>
			</section>
		</StyledApp>
	)
}

export default App
