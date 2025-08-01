import * as fs from 'fs';
import * as path from 'path';

import { Command, Direction, Position, Input, Robot } from './types';

const positionRegex = /^(\d+)\s+(\d+)$/; // "X Y"
const positionWithDirectionRegex = /^(\d+)\s+(\d+)\s+([NSEW])$/; // "X Y D"
const commandsRegex = /^[FLR]+$/; // "FLR"

function readRawInput() {
  const inputPath = path.join(__dirname, '..', 'input.txt');
  return fs.readFileSync(inputPath, 'utf-8').trim();
}

export function processGridSize(gridSizeLine: string): Position {
  if (!positionRegex.test(gridSizeLine)) {
    throw new Error('Invalid grid size format.');
  }

  const [gridXString, gridYString] = gridSizeLine.split(/\s+/);
  return { x: parseInt(gridXString), y: parseInt(gridYString) };
}

export function processRobotLines(robotLines: string[]): Robot[] {
  if (robotLines.length % 2 !== 0) {
    throw new Error('Invalid input format.');
  }

  const robots: Robot[] = [];

  for (let i = 0; i < robotLines.length; i += 2) {
    const positionLine = robotLines[i];
    const commandsLine = robotLines[i + 1];

    if (!positionWithDirectionRegex.test(positionLine)) {
      throw new Error('Invalid robot position format.');
    }

    if (!commandsRegex.test(commandsLine)) {
      throw new Error('Invalid robot command format.');
    }

    const [xString, yString, direction] = positionLine.split(/\s+/);
    const x = parseInt(xString);
    const y = parseInt(yString);

    robots.push({
      position: { x, y, direction: direction as Direction },
      commands: commandsLine.split('') as Command[],
    });
  }

  return robots;
}

export function processInput(): Input {
  const input = readRawInput();
  const inputLines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && line.length > 0);

  if (inputLines.length < 3) {
    throw new Error('Invalid input format: must contain a grid size and at least one robot position.');
  }

  const [gridSizeLine, ...robotLines] = inputLines;

  const grid = processGridSize(gridSizeLine);
  const robots = processRobotLines(robotLines);

  return { grid, robots };
}
