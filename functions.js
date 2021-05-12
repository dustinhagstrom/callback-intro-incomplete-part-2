const identity = function (value) {
  return value;
};

const indexOf = function (array, target) {
  //array = [1], target = 1
  var result = -1;

  each(array, function (item, index) {
    //item = 1
    if (item === target && result === -1) {
      result = index;
      //result = 1
    }
  });

  return result;
};

const each = function (collection, iterator) {
  if (collection instanceof Array) {
    for (let i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else if (collection instanceof Object) {
    for (let prop in collection) {
      iterator(collection[prop], prop, collection);
    }
  }
};

const map = function (collection, iterator) {
  var result = [];

  each(collection, function (element, index, array) {
    result.push(iterator(element));
  });

  return result;
};

const filter = function (collection, callback) {
  let brandNewArray = [];
  each(collection, function (num) {
    if (callback(num)) {
      brandNewArray.push(num);
    }
  });
  return brandNewArray;
};

//reject([1, 2, 3, 4, 5, 6], isEven);
const reject = function (collection, callbackTest) {
  return filter(collection, function (value) {
    return !callbackTest(value);
  });
};

const uniq = function (array) {
  let brandNewArray = [];
  each(array, function (num) {
    if (!brandNewArray.includes(num)) {
      brandNewArray.push(num);
    }
  });
  return brandNewArray;
};

const reduce = function (collection, iterator, accumulator) {
  let startingNumber;
  let holdingArray = identity(collection);
  if (accumulator !== undefined) {
    startingNumber = identity(accumulator);
  } else {
    startingNumber = collection[0];
    holdingArray.shift();
  }
  each(holdingArray, function (item) {
    startingNumber = iterator(startingNumber, item);
  });
  return startingNumber;
};

module.exports = {
  filter,
  reject,
  uniq,
  reduce,
  map,
};
