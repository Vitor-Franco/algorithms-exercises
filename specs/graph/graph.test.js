// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
	// code goes here
	const jobs = {};
	const checkedIds = [];
	let degrees = 0;

	let degreeQueue = [myId];
	let connectionsQueue = [];

	while (degreeQueue.length) {
		const personId = degreeQueue.shift();

		if (!checkedIds.includes(personId)) {
			const person = getUser(personId);

			checkedIds.push(personId);
			jobs[person.title] = (jobs[person.title] ?? 0) + 1;

			connectionsQueue.push(...person.connections);
		}

		if (degreeQueue.length === 0 && degrees < degreesOfSeparation) {
			degrees++;
			degreeQueue = connectionsQueue;
			connectionsQueue = [];
		}
	}

	return Object.entries(jobs).reduce(
		(mostCommon, [key, value]) => {
			if (value > mostCommon.amount) {
				return {
					name: key,
					amount: value,
				};
			}

			return mostCommon;
		},
		{ name: "", amount: 0 },
	).name;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", () => {
	test("user 30 with 2 degrees of separation", () => {
		expect(findMostCommonTitle(30, 2)).toBe("Librarian");
	});

	test("user 11 with 3 degrees of separation", () => {
		expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
	});

	test("user 307 with 4 degrees of separation", () => {
		// if you're failing here with "Clinical Specialist, you're probably not filtering users who
		// appear more than once in people's connections
		expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
	});
});

describe("extra credit", () => {
	test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
		expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
	});
});
