import { processInput } from './input';
import { InstructionProcessor } from './instruction';
import { Output } from './types';

const processedInput = processInput();
const instructionProcessor = new InstructionProcessor(processedInput);
const outputs = instructionProcessor.processInstructions();

logOutput(outputs);

function logOutput(outputs: Output[]): void {
  outputs.forEach((output) => {
    const log = `${output.x} ${output.y} ${output.direction}`;
    if (output.lost) console.log(`${log} LOST`);
    else console.log(log);
  });
}
