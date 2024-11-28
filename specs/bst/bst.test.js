/*

Binary Search Tree!

Name your class Tree. 

I'd suggest making another class called Node. You don't have to; you can make them all plain JS objects

Here you'll make a BST. Your Tree class will have keep track of a root which will be the first item added
to your tree. From there, if the item is less than the value of that node, it will go into its left subtree
and if greater it will go to the right subtree.

value - integer     - value being contained in the node
left  - Node/object - the left node which itself may be another tree
right - Node/object - the right node which itself may be another tree

*/

class Tree {
	// code goes here

	constructor() {
		this.root = null;
	}

	toObject() {
		return this.root;
	}

	add(num) {
		if (!this.root) {
			const node = new Node(num);
			this.root = node;
			return;
		}

		// console.log("this.root", this.root);

		let node = this.root;

		do {
			if (node.value === num) {
				return node;
			}

			const isLeft = num <= node.value;

			if (isLeft) {
				if (node.left) {
					node = node.left;
				} else {
					node.left = new Node(num);
					break;
				}
			} else {
				if (node.right) {
					node = node.right;
				} else {
					node.right = new Node(num);
					break;
				}
			}
		} while (true);
	}
}

class Node {
	// code maybe goes here
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

// unit tests
// do not modify the below code
describe("Binary Search Tree", () => {
	it("creates a correct tree", () => {
		const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
		const tree = new Tree();
		nums.map((num) => tree.add(num));
		console.log("[LOG] ~ nums:", nums);
		console.log("[LOG] ~ tree:", tree);
		const objs = tree.toObject();
		// render(objs, nums);

		expect(objs.value).toEqual(3);

		expect(objs.left.value).toEqual(1);
		expect(objs.left.left).toBeNull();

		expect(objs.left.right.value).toEqual(2);
		expect(objs.left.right.left).toBeNull();
		expect(objs.left.right.right).toBeNull();

		expect(objs.right.value).toEqual(7);

		expect(objs.right.left.value).toEqual(4);
		expect(objs.right.left.left).toBeNull();

		expect(objs.right.left.right.value).toEqual(6);
		expect(objs.right.left.right.left.value).toEqual(5);
		expect(objs.right.left.right.left.right).toBeNull();
		expect(objs.right.left.right.left.left).toBeNull();

		expect(objs.right.right.value).toEqual(10);
		expect(objs.right.right.right).toBeNull();

		expect(objs.right.right.left.value).toEqual(9);
		expect(objs.right.right.left.right).toBeNull();

		expect(objs.right.right.left.left.value).toEqual(8);
		expect(objs.right.right.left.left.right).toBeNull();
		expect(objs.right.right.left.left.left).toBeNull();
	});
});
