const breadthFirstTraverse = (queue, array) => {
	// fill code in here

	do {
		const firstItem = queue.shift();

		array.push(firstItem.value);
		firstItem.left && queue.push(firstItem.left);
		firstItem.right && queue.push(firstItem.right);
	} while (queue.length > 0);

	return array;
};

// unit tests
// do not modify the below code
describe("breadth-first tree traversal", () => {
	const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

	const tree = {
		value: "A",
		left: {
			value: "B",
			left: {
				value: "D",
				left: {
					value: "G",
					left: null,
					right: null,
				},
				right: null,
			},
			right: {
				value: "E",
				left: null,
				right: {
					value: "H",
					left: {
						value: "K",
						left: null,
						right: null,
					},
				},
			},
		},
		right: {
			value: "C",
			left: {
				value: "F",
				left: {
					value: "I",
					left: null,
					right: null,
				},
				right: {
					value: "J",
					left: null,
					right: null,
				},
			},
			right: null,
		},
	};

	test("breadthFirstTraverse", () => {
		expect(breadthFirstTraverse([tree], [])).toEqual(answer);
	});
});
