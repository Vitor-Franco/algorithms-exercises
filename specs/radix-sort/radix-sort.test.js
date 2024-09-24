/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function getDigit(number, place, longestNumber) {
	const numberStringify = String(number).padStart(longestNumber, "0");
	const position = numberStringify.length - place;
	const digit = numberStringify[position - 1];

	return digit;
}

function getLongestNumber(array) {
	return Math.max(...array);
}

function radixSort(array) {
	// code goes here
	const longestNumber = String(getLongestNumber(array)).length;

	const bucketsAvailable = Array(10)
		.fill()
		.map(() => []);

	const orderedArray = array;

	for (let decimalHouse = 0; decimalHouse < longestNumber; decimalHouse++) {
		while (orderedArray.length > 0) {
			const element = orderedArray.shift();
			const digit = getDigit(element, decimalHouse, longestNumber);
			bucketsAvailable[digit].push(element);
		}

		for (let index = 0; index < bucketsAvailable.length; index++) {
			const bucket = bucketsAvailable[index];
			orderedArray.push(...bucket);

			bucketsAvailable[index] = [];
		}
	}

	return orderedArray;
}

// unit tests
// do not modify the below code
describe("radix sort", () => {
	it("should sort correctly", () => {
		const nums = [
			20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
			3000, 3001, 1200, 633,
		];
		const ans = radixSort(nums);
		expect(ans).toEqual([
			1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
			1200, 1244, 3000, 3001,
		]);
	});
	it("should sort 99 random numbers correctly", () => {
		const fill = 99;
		const nums = new Array(fill)
			.fill()
			.map(() => Math.floor(Math.random() * 500000));
		const ans = radixSort(nums);
		expect(ans).toEqual(nums.sort());
	});
});
