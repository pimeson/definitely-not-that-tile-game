import { TileColors } from './../constants';
import { TileLocations } from './../types/tiles';

export const LIGHT_BLUE_TILE_LOCATIONS: TileLocations = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4]
];
export const YELLOW_TILE_LOCATIONS: TileLocations = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0]
];
export const AZUL_TILE_LOCATIONS: TileLocations = [
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [0, 4]
];
export const RED_TILE_LOCATIONS: TileLocations = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 0],
  [4, 1]
];
export const BLACK_TILE_LOCATIONS: TileLocations = [
  [0, 3],
  [1, 4],
  [2, 0],
  [3, 1],
  [4, 2]
];
export const TILE_MAPPING = {
  [TileColors.LightBlue]: LIGHT_BLUE_TILE_LOCATIONS,
  [TileColors.Azul]: AZUL_TILE_LOCATIONS,
  [TileColors.Yellow]: YELLOW_TILE_LOCATIONS,
  [TileColors.Black]: BLACK_TILE_LOCATIONS,
  [TileColors.Red]: RED_TILE_LOCATIONS
};