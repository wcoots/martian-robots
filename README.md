# Martian Robots

## Instructions to run

1. Install packages by running `npm install`.
1. Paste input into `input.txt`.
1. Run `npm run start`.

## Summary of approach

I decided to tackle this programming problem with a node application, partly because they are lightweight and easy to read, and partly because it is the framework that I am most familiar with.

I started by splitting the problem into two halves - processing the input into a JSON structure, and then handling the data to calculate the final positions of the robots.

The input processing is done using REGEX checks to validate the format of the input data. If the data passes these checks, then the grid size, robot positions and robot instructions are extracted from the text and returned in JSON.

If input processing was successful, the data is then processed to calculate the final status of each robot. For each robot, the initial position is transformed by that robot's commands. If the robot leaves the grid, the robot is considered "lost", the "lost position" is stored, and processing continues to the next robot. If a robot attempts to move off the grid from a position where another robot was previously lost, the robot does not move to that tile. The final position, direction and lost-status of each robot is then returned in JSON format.

Finally, the output is logged to the terminal in the required plain-text format.

## Testing

I have written unit tests for the functions that contain the core logic. These can be run with: `npm run test`.

## Assumptions

> The maximum value for any coordinate is 50.
>
> All instruction strings will be less than 100 characters in length.

I have written my code assuming that these are **not** required as checks, and that they are simply guidelines for the sort of data that I may expect.

## Future work

> There is also a possibility that additional command types may be required in the future and provision should be made for this.

The most obvious additional _direction_ command is `TURN_180`, which would be simple to integrate into the direction map in `instruction.ts`. Other additional _direction_ commands may be divisional, such as `RIGHT_HALF`. This would require the addition of diagonal directions such as North-East.

Additional _movement_ commands such as `BACKWARDS` or `FORWARD_2` could be done using multipliers on the base movement matrices in the direction map. The addition of lateral _movement_ commands such as `LEFT` and `RIGHT` may require a refactor.

![wall-e](https://media1.tenor.com/m/-NsZyjeNEQUAAAAd/wall-e-disney.gif)
