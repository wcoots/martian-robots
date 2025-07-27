import { Command, Direction, Position, Input, Output, Robot } from './types';

const directionMap: Record<Direction, Position & { [Command.LEFT]: Direction; [Command.RIGHT]: Direction }> = {
  [Direction.NORTH]: { x: 0, y: 1, [Command.LEFT]: Direction.WEST, [Command.RIGHT]: Direction.EAST },
  [Direction.EAST]: { x: 1, y: 0, [Command.LEFT]: Direction.NORTH, [Command.RIGHT]: Direction.SOUTH },
  [Direction.SOUTH]: { x: 0, y: -1, [Command.LEFT]: Direction.EAST, [Command.RIGHT]: Direction.WEST },
  [Direction.WEST]: { x: -1, y: 0, [Command.LEFT]: Direction.SOUTH, [Command.RIGHT]: Direction.NORTH },
};

export class InstructionProcessor {
  private grid: Position;
  private robots: Robot[];
  private lostPositions: Position[] = [];

  constructor(input: Input) {
    this.grid = input.grid;
    this.robots = input.robots;
  }

  public processInstructions(): Output[] {
    const outputs: Output[] = [];

    this.robots.forEach(({ position: initialPosition, commands }) => {
      const position: Output = { ...initialPosition, lost: false };

      commands.forEach((command) => {
        if (position.lost) return;

        if (command === Command.FORWARD) {
          const movement = directionMap[position.direction];

          const nextX = position.x + movement.x;
          const nextY = position.y + movement.y;
          const nextPosition: Position = { x: nextX, y: nextY };

          const previouslyLost = this.isPositionPreviouslyLost(nextPosition);
          const lost = this.isPositionLost(nextPosition);

          if (lost && !previouslyLost) {
            position.lost = true;
          } else if (!previouslyLost) {
            position.x = nextX;
            position.y = nextY;
          }
        } else if (command === Command.LEFT || command === Command.RIGHT) {
          position.direction = directionMap[position.direction][command];
        }
      });

      outputs.push(position);
    });

    return outputs;
  }

  private isPositionPreviouslyLost(position: Position): boolean {
    return this.lostPositions.some((lostPosition) => lostPosition.x === position.x && lostPosition.y === position.y);
  }

  private isPositionLost(position: Position): boolean {
    const positionOutOfBounds =
      position.x < 0 || position.x > this.grid.x || position.y < 0 || position.y > this.grid.y;
    if (positionOutOfBounds) this.lostPositions.push(position);
    return positionOutOfBounds;
  }
}
