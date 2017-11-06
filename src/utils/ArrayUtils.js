export function compare(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let count = 0;
  let hash = {};

  for (let i = 0; i < arr1.length; i++) {
    let k1 = arr1[i].toString();
    let k2 = arr2[i].toString();

    if (hash[k1] === 2) {
      return false;
    } else if (hash[k1] === 1) {
      hash[k1] = 2;
      count++;
    } else {
      hash[k1] = 1;
    }

    if (hash[k2] === 2) {
      return false;
    } if (hash[k2] === 1) {
      hash[k2] = 2;
      count++;
    } else {
      hash[k2] = 1;
    }
  }

  return count === arr1.length;
}

// https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

/* finds the intersection of
 * two arrays in a simple fashion.
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is
 *    n = MIN(a.length(), b.length())
 */
export function intersect(a, b) {
  let ai=0, bi=0;
  let result = [];

  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++;
    } else if (a[ai] > b[bi]) {
      bi++;
    } else {
      result.push(a[ai]);
      ai++;
      bi++;
    }
  }

  return result;
}

/**
 * Merges array a and array b. Items in a override items in b.
 *
 * Each item is passed through the identityFunction and converted to a String which is used
 * as a basis of item comparison.
 *
 * @param a Array A
 * @param b Array B. Items in property B that exist in A will be ignored.
 * @param identityFunction A function that takes in a single item and returns a String used as a key for comparison.
 * @returns {*} The new array.
 */
export function merge(a, b, identityFunction) {
  a = a || [];
  b = b || [];

  let final = a.concat();

  let keys = {};

  if (!identityFunction) {
    identityFunction = item => typeof item === 'object' ? item.id : item;
  }

  a.forEach(item => {
    let id = identityFunction(item);
    keys[id] = item;
  });

  b.forEach(item => {
    let id = identityFunction(item);

    if (!keys[id]) {
      final.push(item);
    }
  });

  return final;
}
