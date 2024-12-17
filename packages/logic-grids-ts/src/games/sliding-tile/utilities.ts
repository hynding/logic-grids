export const ARROW_KEYCODES = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export const reduceList = (list: number[]) => list.reduce((result, num) => num ? result.concat(num) : result, [] as number[]);

// Can this be prettier with ES6?
export const combineList = (list: number[]) => {
  for(let i=1; i<list.length; i++) {
    if (list[i] && list[i-1] === list[i]) {
      list.splice(i-1, 2, list[i]*2);
    }
  }
  return list;
}

export const fetchValues = (grid: number[][], index: number, useColumn = false, reverse = false) => {
  const length = useColumn ? grid.length : grid[index].length;
  const result = [];
  for(let i=0; i<length; i++) {
    result.push(grid[useColumn ? i : index][useColumn ? index : i]);
  }
  return reverse ? result.reverse() : result;
}

export const replaceValues = (values: number[], grid: number[][], index: number, useColumn = false, reverse = false) => {
  const length = useColumn ? grid.length : grid[index].length;
  const replacement = reverse ? values.reverse() : values;
  for(let i=0; i<length; i++) {
    grid[useColumn ? i : index][useColumn ? index : i] = replacement[i] || 0;
  }
}

export const stretch = (list: number[], length: number) => {
  while(list.length < length) {
    list.push(0);
  }
  return list;
}