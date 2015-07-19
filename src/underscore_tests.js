/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (! n) {
      return array[0];
    }
    return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (! n) {
      return array[array.length-1];
    }
    if (n > array.length) {
      return array;
    }
    return array.slice(n-1, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(collection instanceof Array) {
      collection.forEach(function(letter, index, collection) {
        iterator(letter, index, collection);
      });      
    } else { // is object
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++) {
      if(array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var result = [];
    for (var i = 0; i < collection.length; i++) {
      if (! iterator(collection[i])) {
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    for(var i = 0; i < array.length; i++) {
      var found = false;
      for(var j = 0; j < result.length; j++) {
        if(array[i] === result[j]) {
          found = true;
          break;
        } 
      }
      if(!found) {
        result.push(array[i]);
      }
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(iterator(array[i]));
    }
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(array[i][propertyName]);
    }
    return result;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      if(typeof methodName === 'string') {
        result.push(list[i][methodName]());
      } else {
        result.push(methodName.call(list[i]));       
      }
    }
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
      var result = initialValue || 0;
      for(var i = 0; i < collection.length; i++) {
        result = iterator(result, collection[i]);
      }
      return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
     if(collection instanceof Array) {
        for (var i = 0; i < collection.length; i++) {       
          if (collection[i] === target) {
            return true;
          }
        }
      } else {
        for(var prop in collection) {
          if(collection[prop] === target) {
            return true;
          }
        }
      }
      return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    function toBoolean(value) {
      if(! value) {
          return false;
      }
      if(typeof value === 'number') {
          return value > 0 ;
      }
      return value ? true : false;
    }
     
    if(! iterator) {
      iterator = function(i) { return i; }
    }
     
    if(collection.length === 0) {
      return true;
    }
    var result = true;
    for (var i = 0; i < collection.length; i++) {
      result = result && toBoolean(iterator(collection[i]));
      if(! result) {
          break;
      }
    }
    return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    function toBoolean(value) {
      if(! value) {
          return false;
      }
      if(typeof value === 'number') {
          return value > 0 ;
      }
      return value ? true : false;
    }
     
    if(! iterator) {
      iterator = function(i) { return i; }
    }
     
    if(collection.length === 0) {
      return false;
    }
    var result = false;
    for (var i = 0; i < collection.length; i++) {
      result = toBoolean(iterator(collection[i]));
      if(result) {
          break;
      }
    }
    return result;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
     var result = arguments[0];
     for (var i = 1; i < arguments.length; i++) {
         for(var prop in arguments[i]) {
             result[prop] = arguments[i][prop];
         }
     }
     return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      for(var prop in arguments[i]) {
        if(result[prop] === undefined) {
          result[prop] = arguments[i][prop];
        }
      }
    }
    return result;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var called = 0;
    var doNothing = function () {};
    return function() {
        if(called > 0) {
            return doNothing();
        } else {
            called++;
            return func();
        }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
      var myFunc = func;
      var responses = [];
      return function (param) {
        for(var i = 0; i < responses.length; i++) {
          if(responses.param === param) {
            return responses.value;
          }
        }
        responses.push({param: param, value: myFunc(param)})
        return responses[responses.length -1].value;
      }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var myArguments = [];
    for(var i = 2; i < arguments.length; i++) {
      myArguments[i-2] = arguments[i];
    }
    setTimeout(function(){ func.apply({}, myArguments); }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    // from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    var o = array.slice(0);
    for(var j, x, i = o.length; i; 
      j = Math.floor(Math.random() * i), 
      x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    function compareWProperty (a, b) {
        if (a[iterator] > b[iterator]) {
          return 1;
        }
        if (a[iterator] < b[iterator]) {
          return -1;
        }
        // a must be equal to b
        return 0;
    }
    function compareWFunc (a, b) {
        if (iterator(a) > iterator(b)) {
          return 1;
        }
        if (iterator(a) < iterator(b)) {
          return -1;
        }
        // a must be equal to b
        return 0;
    }
    if(typeof iterator === 'string') {
      return collection.sort(compareWProperty);
    } else {
      return collection.sort(compareWFunc);
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    function countNoOfItems (arraySet) {
        var noOfItems = 0;
        for (var i = 0; i < arraySet.length; i++) {
            noOfItems = noOfItems > arraySet[i].length ? noOfItems : arraySet[i].length;
        }
        return noOfItems;
    } 
    function createNthItem (arraySet, n) {
      var item = [];
      for(var i = 0; i < arraySet.length; i++) {
          item.push((arraySet[i].length > n) ? arraySet[i][n] : undefined);
      }
      return item;
    }
    var result = [];
    var noOfItems = countNoOfItems(arguments);
    for(var j = 0; j < noOfItems; j++) {
      var item = createNthItem(arguments, j);
      result.push(item);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray) {
    var result = [];
    for(var i = 0; i < nestedArray.length; i++) {
      if(nestedArray[i] instanceof Array) {
        result = result.concat(_.flatten(nestedArray[i]));
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.

  _.intersection = function() {
    function itemFound(arr, item) {
      for(var i = 0; i < arr.length; i++) {
        if(arr[i] === item) {
          return true;
        }
      }
      return false;
    }
    var arraySet = arguments;
    var result = arraySet[0];
    for (var i = 1; i < arraySet.length; i++) {
      for(var j = result.length - 1; j >=0; j--) {
        if(! itemFound(arraySet[i], result[j])) {
          result.splice(j, 1)
        }
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    function itemFound(arr, item) {
      for(var i = 0; i < arr.length; i++) {
        if(arr[i] === item) {
          return true;
        }
      }
      return false;
    }
    var arraySet = arguments;
    var result = arraySet[0];
    for (var i = 1; i < arraySet.length; i++) {
      for(var j = result.length - 1; j >=0; j--) {
        if(itemFound(arraySet[i], result[j])) {
          result.splice(j, 1)
        }
      }
      console.log(i, result);
    }
    return result;
  };

}).call(this);
