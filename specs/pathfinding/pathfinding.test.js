// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

function generateVisited(maze) {
	const visited = [];
	for (let y = 0; y < maze.length; y++) {
		const yAxis = [];

		for (let x = 0; x < maze[y].length; x++) {
			const coordinateX = {
				closed: maze[y][x] === 1,
				length: 0,
				openedBy: NO_ONE,
				x,
				y,
			};

			yAxis.push(coordinateX);
		}

		visited.push(yAxis);
	}

	return visited;
}

function getNeighbors(visited, x, y) {
	const neighbors = [];

	const upPosition = y - 1;
	const upIsInHeightRange = upPosition >= 0;
	if (upIsInHeightRange && visited[upPosition][x].closed === false) {
		neighbors.push(visited[upPosition][x]); // up
	}

	const downPosition = y + 1;
	const maxYHeight = visited[0].length;
	if (downPosition < maxYHeight && visited[downPosition][x].closed === false) {
		neighbors.push(visited[downPosition][x]); // down
	}

	const leftPosition = x - 1;
	const leftIsInMinLeftHeight = leftPosition >= 0;
	if (leftIsInMinLeftHeight && visited[y][leftPosition].closed === false) {
		neighbors.push(visited[y][leftPosition]); // left
	}

	const rightPosition = x + 1;
	const maxXWidth = visited.length;
	if (rightPosition < maxXWidth && visited[y][rightPosition].closed === false) {
		neighbors.push(visited[y][rightPosition]); // right
	}

	return neighbors;
}

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
	const visited = generateVisited(maze);
	visited[yA][xA].openedBy = BY_A;
	visited[yB][xB].openedBy = BY_B;

	const aQueue = [visited[yA][xA]];
	const bQueue = [visited[yB][xB]];
	let iteration = 0;

	while (aQueue.length && bQueue.length) {
		iteration++;

		// gater aNeighbors
		let aNeighbors = [];
		while (aQueue.length) {
			const coordinate = aQueue.shift();
			aNeighbors = aNeighbors.concat(
				getNeighbors(visited, coordinate.x, coordinate.y),
			);
		}

		// process aNeighbors
		for (const neighbor of aNeighbors) {
			if (neighbor.openedBy === BY_B) {
				return neighbor.length + iteration;
			}

			if (neighbor.openedBy === NO_ONE) {
				neighbor.length = iteration;
				neighbor.openedBy = BY_A;
				aQueue.push(neighbor);
			}
		}

		// gater bNeighbors
		let bNeighbors = [];
		while (bQueue.length) {
			const coordinate = bQueue.shift();
			bNeighbors = bNeighbors.concat(
				getNeighbors(visited, coordinate.x, coordinate.y),
			);
		}

		// process bNeighbors
		for (const bNeighbor of bNeighbors) {
			if (bNeighbor.openedBy === BY_A) {
				return bNeighbor.length + iteration;
			}

			if (bNeighbor.openedBy === NO_ONE) {
				bNeighbor.length = iteration;
				bNeighbor.openedBy = BY_B;
				bQueue.push(bNeighbor);
			}
		}
	}

	return -1;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", () => {
	const fourByFour = [
		[2, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 2],
	];
	it("should solve a 4x4 maze", () => {
		expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
	});

	const sixBySix = [
		[0, 0, 0, 0, 0, 0],
		[0, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 2, 0, 0, 0],
	];
	it("should solve a 6x6 maze", () => {
		expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
	});

	const eightByEight = [
		[0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 1, 0],
		[0, 2, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 1, 2],
	];
	it("should solve a 8x8 maze", () => {
		expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
	});

	const fifteenByFifteen = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
		[0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
		[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
		[0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	it("should solve a 15x15 maze", () => {
		expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
			78,
		);
	});
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", () => {
	const byEachOther = [
		[0, 0, 0, 0, 0],
		[0, 2, 2, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1],
		[0, 0, 0, 0, 0],
	];
	it("should solve the maze if they're next to each other", () => {
		expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
	});

	const impossible = [
		[0, 0, 0, 0, 0],
		[0, 2, 0, 0, 0],
		[0, 0, 1, 1, 1],
		[1, 1, 1, 0, 0],
		[0, 0, 0, 0, 2],
	];
	it("should return -1 when there's no possible path", () => {
		expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
	});
});
