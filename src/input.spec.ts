import { processGridSize, processRobotLines } from './input';

describe('processGridSize', () => {
  it('should throw when grid size format is invalid', () => {
    expect(() => processGridSize('10')).toThrow('Invalid grid size format.');
    expect(() => processGridSize('10 20 30')).toThrow('Invalid grid size format.');
    expect(() => processGridSize('10,20')).toThrow('Invalid grid size format.');
    expect(() => processGridSize('throw')).toThrow('Invalid grid size format.');
  });

  it('should return grid size when format is valid', () => {
    const grid = processGridSize('10 20');
    expect(grid).toEqual({ x: 10, y: 20 });
  });
});

describe('processRobotLines', () => {
  it('should throw when robot lines are incomplete', () => {
    expect(() => processRobotLines(['1 2 N'])).toThrow('Invalid input format.');
    expect(() => processRobotLines(['1 2 N', 'FLR', '3 4 E'])).toThrow('Invalid input format.');
  });

  it('should throw when a robot position format is invalid', () => {
    expect(() => processRobotLines(['N 1 2', 'FLR'])).toThrow('Invalid robot position format.');
    expect(() => processRobotLines(['1 N 2', 'FLR'])).toThrow('Invalid robot position format.');
    expect(() => processRobotLines(['12N', 'FLR'])).toThrow('Invalid robot position format.');
    expect(() => processRobotLines(['throw', 'FLR'])).toThrow('Invalid robot position format.');
  });

  it('should throw when a robot command format is invalid', () => {
    expect(() => processRobotLines(['1 2 N', 'F L R'])).toThrow('Invalid robot command format.');
    expect(() => processRobotLines(['1 2 N', 'ALR'])).toThrow('Invalid robot command format.');
    expect(() => processRobotLines(['1 2 N', 'throw'])).toThrow('Invalid robot command format.');
  });

  it('should return robots when input is valid', () => {
    const robots = processRobotLines(['1 2 N', 'FLR', '3 4 E', 'RLF']);
    expect(robots).toEqual([
      { position: { x: 1, y: 2, direction: 'N' }, commands: ['F', 'L', 'R'] },
      { position: { x: 3, y: 4, direction: 'E' }, commands: ['R', 'L', 'F'] },
    ]);
  });
});
