import { InstructionProcessor } from './instruction';
import { Command, Direction } from './types';

describe('processInstructions', () => {
  it('should output the final position of a robot', () => {
    const instructionProcessor = new InstructionProcessor({
      grid: { x: 5, y: 3 },
      robots: [
        {
          position: { x: 1, y: 1, direction: Direction.EAST },
          // RFRFRFRF
          commands: [
            Command.RIGHT,
            Command.FORWARD,
            Command.RIGHT,
            Command.FORWARD,
            Command.RIGHT,
            Command.FORWARD,
            Command.RIGHT,
            Command.FORWARD,
          ],
        },
      ],
    });

    const outputs = instructionProcessor.processInstructions();
    expect(outputs).toEqual([{ x: 1, y: 1, direction: Direction.EAST, lost: false }]);
  });

  it('should mark a robot as lost if it goes out of bounds', () => {
    const instructionProcessor = new InstructionProcessor({
      grid: { x: 5, y: 3 },
      robots: [
        {
          position: { x: 3, y: 2, direction: Direction.NORTH },
          // FRRFLLFFRRFLL
          commands: [
            Command.FORWARD,
            Command.RIGHT,
            Command.RIGHT,
            Command.FORWARD,
            Command.LEFT,
            Command.LEFT,
            Command.FORWARD,
            Command.FORWARD,
            Command.RIGHT,
            Command.FORWARD,
            Command.RIGHT,
            Command.LEFT,
            Command.LEFT,
          ],
        },
      ],
    });

    const outputs = instructionProcessor.processInstructions();
    expect(outputs).toEqual([{ x: 3, y: 3, direction: Direction.NORTH, lost: true }]);
  });

  it('should prevent robots from moving to previously lost positions', () => {
    const instructionProcessor = new InstructionProcessor({
      grid: { x: 5, y: 3 },
      robots: [
        {
          position: { x: 3, y: 2, direction: Direction.NORTH },
          // FRRFLLFFRRFLL
          commands: [
            Command.FORWARD,
            Command.RIGHT,
            Command.RIGHT,
            Command.FORWARD,
            Command.LEFT,
            Command.LEFT,
            Command.FORWARD,
            Command.FORWARD,
            Command.RIGHT,
            Command.FORWARD,
            Command.RIGHT,
            Command.LEFT,
            Command.LEFT,
          ],
        },
        {
          position: { x: 0, y: 3, direction: Direction.WEST },
          // LLFFFLFLFL
          commands: [
            Command.LEFT,
            Command.LEFT,
            Command.FORWARD,
            Command.FORWARD,
            Command.FORWARD,
            Command.LEFT,
            Command.FORWARD,
            Command.LEFT,
            Command.FORWARD,
            Command.LEFT,
          ],
        },
      ],
    });

    const outputs = instructionProcessor.processInstructions();
    expect(outputs[1]).toEqual({ x: 2, y: 3, direction: Direction.SOUTH, lost: false });
  });
});
