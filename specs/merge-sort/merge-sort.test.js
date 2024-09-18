/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (left = [], right = []) => {
	const sorted = [];

	while (left.length && right.length) {
		if (right[0] >= left[0]) {
			sorted.push(left.shift());
		} else {
			sorted.push(right.shift());
		}
	}

	return sorted.concat(left, right);
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
