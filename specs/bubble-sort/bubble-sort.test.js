/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

function bubbleSort(nums) {
  // code goes here

  let swapped = true;

  while (swapped) {
    swapped = false;
    
    for (let index = 0; index < nums.length; index++) {
      const number = nums[index];
      const nextNumber = nums[index + 1];
    
      if (!nextNumber) continue;

      if (number > nextNumber) {
        nums[index + 1] = number;
        nums[index] = nextNumber;
        swapped = true;
      }
    }
  }

  return nums
}

// unit tests
// do not modify the below code
test("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = bubbleSort(nums);
  console.log("🚀 ~ sortedNums:", sortedNums)
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
