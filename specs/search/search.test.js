// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
	return array.find((el) => el.id === id);
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
	let startIndex = 0;
	let endIndex = array.length;

	while (startIndex <= endIndex) {
		const currentIndex = Math.floor((startIndex + endIndex) / 2);
		const middleEl = array[currentIndex];

		if (middleEl.id === id) {
			return middleEl;
		}

		if (middleEl.id > id) {
			endIndex = currentIndex - 1;
		} else {
			startIndex = currentIndex + 1;
		}
	}

	return null;
}

// unit tests
// do not modify the below code
test("linear search", () => {
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
