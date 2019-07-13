import styled from "@emotion/styled";
import { TileLocation } from "../App";

export const Tile =
	styled.div <
	{ tile: TileLocation } >
	`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: ${({ tile }) => (tile.isOccupied ? 1 : 0.3)};
`