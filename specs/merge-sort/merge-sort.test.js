/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (left = [], right = []) => {
	const sorted = [];

	let index2 = 0;
	let index1 = 0;

	for (index1; index1 < left.length; index1++) {
		const numberOne = left[index1];

		for (index2; index2 < right.length; index2++) {
			const element2 = right[index2];

			if (numberOne < element2) {
				sorted.push(numberOne);
				break;
			}

			sorted.push(element2);
		}

		if (!sorted.includes(numberOne)) {
			sorted.push(numberOne);
		}
	}

	if (right.length !== index2) {
		sorted.push(...right.slice(index2));
	}

	if (left.length !== index1) {
		sorted.push(...left.slice(index1));
	}

	console.log("[LOG] ~ sorted:", sorted)
	return sorted;
};

const mergeSort = (nums) => {
	const sizeByTwo = Math.floor(nums.length / 2);

	if (sizeByTwo === 0) {
		return nums;
	}

	const leftPart = nums.slice(0, sizeByTwo);
	const rightPart = nums.slice(sizeByTwo);
	return merge(mergeSort(leftPart), mergeSort(rightPart));
};

// unit tests
// do not modify the below code
test("merge sort", () => {
	const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
	const ans = mergeSort(nums);
	expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
