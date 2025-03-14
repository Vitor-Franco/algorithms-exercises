const preorderTraverse = (node, array) => {
	array.push(node.value);

	if (node.left) {
		preorderTraverse(node.left, array);
	}

	if (node.right) {
		preorderTraverse(node.right, array);
	}

	return array;
};

const inorderTraverse = (node, array) => {
	if (node.left) {
		inorderTraverse(node.left, array);
	}

	array.push(node.value);

	if (node.right) {
		inorderTraverse(node.right, array);
	}
  
	return array;
};

const postorderTraverse = (node, array) => {
	if (node.left) {
		postorderTraverse(node.left, array);
	}

	if (node.right) {
		postorderTraverse(node.right, array);
	}

	array.push(node.value);
	return array;
};

// unit tests
// do not modify the below code
const tree = {
	value: 8,
	left: {
		value: 4,
		left: {
			value: 3,
			left: {
				value: 2,
				left: null,
				right: null,
			},
			right: null,
		},
		right: {
			value: 5,
			left: null,
			right: {
				value: 7,
				left: {
					value: 6,
					left: null,
					right: null,
				},
			},
		},
	},
	right: {
		value: 12,
		left: {
			value: 10,
			left: {
				value: 9,
				left: null,
				right: null,
			},
			right: {
				value: 11,
				left: null,
				right: null,
			},
		},
	},
};

test("(pre-order) depth-first traversals", () => {
	expect(preorderTraverse(tree, [])).toEqual([
		8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11,
	]);
});

test("(inorderTraverse) depth-first traversals", () => {
	expect(inorderTraverse(tree, [])).toEqual([
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
	]);
});

test("(postorderTraverse) depth-first traversals", () => {
	expect(postorderTraverse(tree, [])).toEqual([
		2, 3, 6, 7, 5, 4, 9, 11, 10, 12, 8,
	]);
});
