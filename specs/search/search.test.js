// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
	// code goes here
}

function recursiveBinarySearch(id, array) {
	const middleIndex = Math.floor(array.length / 2);
	const middle = array[middleIndex];

	if (middle.id === id) {
		return middle;
	}

	if (middle.id > id) {
		return recursiveBinarySearch(id, array.slice(0, middleIndex));
	}

	return recursiveBinarySearch(id, array.slice(middleIndex));
}

function binarySearch(id, array) {
	// code goes here

	let isSearching = true;
	let result;
	let startIndex = 0;
	let limit = 0;
	let endIndex = array.length;

	while (isSearching) {
		limit++;

		if (limit === 200) {
			isSearching = false;
		}

		const slicedArray = array.slice(startIndex, endIndex);
		const middleEl = slicedArray[Math.floor(slicedArray.length / 2)];

		const middleSizeInMain = array.findIndex((el) => el.id === middleEl.id);

		if (middleEl.id === id) {
			isSearching = false;
			result = middleEl;
			return result;
		}

		const middleIsBigger = middleEl.id > id;

		if (middleIsBigger) {
			endIndex = middleSizeInMain;
		} else {
			startIndex = middleSizeInMain;
		}
	}
}

// unit tests
// do not modify the below code
test.skip("linear search", () => {
	const lookingFor = { id: 5, name: "Brian" };
	expect(
		linearSearch(5, [
			{ id: 1, name: "Sam" },
			{ id: 11, name: "Sarah" },
			{ id: 21, name: "John" },
			{ id: 10, name: "Burke" },
			{ id: 13, name: "Simona" },
			{ id: 31, name: "Asim" },
			{ id: 6, name: "Niki" },
			{ id: 19, name: "Aysegul" },
			{ id: 25, name: "Kyle" },
			{ id: 18, name: "Jem" },
			{ id: 2, name: "Marc" },
			{ id: 51, name: "Chris" },
			lookingFor,
			{ id: 14, name: "Ben" },
		]),
	).toBe(lookingFor);
});

test("binary search", () => {
	const lookingFor = { id: 23, name: "Brian" };
	expect(
		binarySearch(23, [
			{ id: 1, name: "Sam" },
			{ id: 3, name: "Sarah" },
			{ id: 5, name: "John" },
			{ id: 6, name: "Burke" },
			{ id: 10, name: "Simona" },
			{ id: 12, name: "Asim" },
			{ id: 13, name: "Niki" },
			{ id: 15, name: "Aysegul" },
			{ id: 17, name: "Kyle" },
			{ id: 18, name: "Jem" },
			{ id: 19, name: "Marc" },
			{ id: 21, name: "Chris" },
			lookingFor,
			{ id: 24, name: "Ben" },
		]),
	).toBe(lookingFor);
});
