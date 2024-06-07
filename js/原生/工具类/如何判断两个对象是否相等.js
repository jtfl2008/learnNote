function isObjectEqual(a, b) {
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === b) return true;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (let key in a) {
    if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      if (!isObjectEqual(a[key], b[key])) return false;
    } else if (a[key] !== b[key]) return false;
  }
  return true;
}

function isObjectEqual(a, b) {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !isObjectEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
