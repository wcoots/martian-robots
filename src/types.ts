export enum Command {
  FORWARD = 'F',
  LEFT = 'L',
  RIGHT = 'R',
}

export enum Direction {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
}

export interface Position {
  x: number;
  y: number;
}

export interface PositionWithDirection extends Position {
  direction: Direction;
}

export interface Robot {
  position: PositionWithDirection;
  commands: Command[];
}

export interface Input {
  grid: Position;
  robots: Robot[];
}

export interface Output extends PositionWithDirection {
  lost: boolean;
}
