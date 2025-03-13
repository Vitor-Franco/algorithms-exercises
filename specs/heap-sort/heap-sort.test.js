/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
	createMaxHeap(array);

	for (let index = array.length - 1; index > 0; index--) {
		swapPlace(0, index, array);
		heapify(array, 0, index);
	}

	return array;
};

const createMaxHeap = (array) => {
  const middleToLeftArrayPart = Math.floor(array.length / 2) - 1;
	
  for (let i = middleToLeftArrayPart; i >= 0; i--) {
		heapify(array, i, array.length);
	}

  return array;
};

const swapPlace = (index1, index2, array) => {
	const temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;

	return array;
};

const heapify = (array, index, heapSize) => {
	const FORMULA = 2 * index;

	const leftChildIndex = FORMULA + 1;
	const rightChildIndex = FORMULA + 2;
  let largestValueIndex = index;

  if (heapSize > leftChildIndex && array[largestValueIndex] < array[leftChildIndex]) {
    largestValueIndex = leftChildIndex;
  }
  
  if (heapSize > rightChildIndex && array[largestValueIndex] < array[rightChildIndex]) {
    largestValueIndex = rightChildIndex;
  }

	if (largestValueIndex !== index) {
    swapPlace(index, largestValueIndex, array)
    heapify(array, largestValueIndex, heapSize)
  }
};

// unit tests
// do not modify the below code
test("heap sort", () => {
	const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
	heapSort(nums);
	expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
