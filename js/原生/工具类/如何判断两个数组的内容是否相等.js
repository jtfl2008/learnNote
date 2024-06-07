function isArraysEqual1(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item, index) => item === arr2[index]);
}

function isArraysEqual2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let item1 = arr1[i];
    let item2 = arr2[i];
    if (Array.isArray(item1) && Array.isArray(item2)) {
      if (!isArraysEqual2(item1, item2)) {
        return false;
      }
    } else if (typeof item1 === 'object' && typeof item2 === 'object') {
      if (!isObjectsEqual(item1, item2)) {
        return false;
      }
    } else if (item1 !== item2) {
      return false;
    }
  }
  return true;
}

function isObjectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!keys2.includes(key) || !isObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
