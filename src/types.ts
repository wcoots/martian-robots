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

export interface Grid {
  x: number;
  y: number;
}

export interface Position extends Grid {
  direction: Direction;
}

export interface Robot {
  initialPosition: Position;
  commands: Command[];
}

export interface Input {
  grid: Grid;
  robots: Robot[];
}
