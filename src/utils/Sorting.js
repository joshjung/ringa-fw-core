export function alphaSort(a, b) {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1
  }

  return 0;
}

export function alphaSortKey(key, direction = 1) {
  return (a, b) => {
    // TODO memoize this stuff
    let ak = a[key] ? a[key].toString().toUpperCase() : '';
    let bk = b[key] ? b[key].toString().toUpperCase() : '';

    if (ak > bk) {
      return direction;
    } else if (ak < bk) {
      return -direction;
    }

    return 0;
  };
}