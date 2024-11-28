import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";
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
		const node = this.find(num);
		node.value = num;
		console.log("[LOG] ~ newNode:", node);
		console.log("[LOG] ~ final:", { node, root: this.toObject() });
	}

	find(num) {
		let node = this.root;

		do {
			if (node.value === num) {
				return node;
			}

			const isLeft = num < node.value;

			if (isLeft) {
				node.left = node.left ?? new Node();
				node = node.left;
			} else {
				node.right = node.right ?? new Node();
				node = node.right;
			}
		} while (node && node.value >= 0);

		return node;
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


export default function TreeComponent() {
  const nums = _.shuffle(_.range(15));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
