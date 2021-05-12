const chai = require("chai");
const expect = chai.expect;

const { filter, reject, uniq, reduce } = require("./functions");

describe("filter", function () {
  it("should return all even numbers in an array", function () {
    var isEven = function (num) {
      return num % 2 === 0;
    };
    var evens = filter([1, 2, 3, 4, 5, 6], isEven);

    expect(evens).to.eql([2, 4, 6]);
  });

  it("should return all odd numbers in an array", function () {
    var isOdd = function (num) {
      return num % 2 !== 0;
    };
    var odds = filter([1, 2, 3, 4, 5, 6], isOdd);

    expect(odds).to.eql([1, 3, 5]);
  });

  it("should produce a brand new array instead of modifying the input array", function () {
    var isOdd = function (num) {
      return num % 2 !== 0;
    };
    var numbers = [1, 2, 3, 4, 5, 6];
    var evens = filter(numbers, isOdd);

    expect(evens).to.not.equal(numbers);
  });
});

describe("reject", function () {
  it("should reject all even numbers", function () {
    var isEven = function (num) {
      return num % 2 === 0;
    };
    var odds = reject([1, 2, 3, 4, 5, 6], isEven);

    expect(odds).to.eql([1, 3, 5]);
  });

  it("should reject all odd numbers", function () {
    var isOdd = function (num) {
      return num % 2 !== 0;
    };
    var evens = reject([1, 2, 3, 4, 5, 6], isOdd);

    expect(evens).to.eql([2, 4, 6]);
  });

  it("should produce a brand new array instead of modifying the input array", function () {
    var isOdd = function (num) {
      return num % 2 !== 0;
    };
    var numbers = [1, 2, 3, 4, 5, 6];
    var evens = reject(numbers, isOdd);

    expect(evens).to.not.equal(numbers);
  });
});

describe("uniq", function () {
  it("should return all unique values contained in an unsorted array", function () {
    var numbers = [1, 2, 1, 3, 1, 4];

    expect(uniq(numbers)).to.eql([1, 2, 3, 4]);
  });

  it("should handle iterators that work with a sorted array", function () {
    var iterator = function (value) {
      return value + 1;
    };
    var numbers = [1, 2, 2, 3, 4, 4];

    expect(uniq(numbers, true, iterator)).to.eql([1, 2, 3, 4]);
  });

  it("should produce a brand new array instead of modifying the input array", function () {
    var numbers = [1, 2, 1, 3, 1, 4];
    var uniqueNumbers = uniq(numbers);

    expect(uniqueNumbers).to.not.equal(numbers);
  });
});

describe("reduce", function () {
  it("should be able to sum up an array", function () {
    var add = function (tally, item) {
      return tally + item;
    };
    var total = reduce([1, 2, 3], add, 0);

    expect(total).to.equal(6);
  });

  it("should use the first element as an accumulator when none is given", function () {
    var add = function (tally, item) {
      return tally + item;
    };
    var total = reduce([1, 2, 3], add);

    expect(total).to.equal(6);
  });

  it("should invoke the iterator on the first element when given an accumulator", function () {
    var sumSquares = function (tally, item) {
      return tally + item * item;
    };
    var total = reduce([2, 3], sumSquares, 0);

    expect(total).to.equal(13);
  });

  it("should not invoke the iterator on the first element when using it as an accumulator", function () {
    var sumSquares = function (tally, item) {
      return tally + item * item;
    };
    var total = reduce([2, 3], sumSquares);

    expect(total).to.equal(11);
  });
});
