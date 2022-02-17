export function isBetween(a: number, b: number, val: number = Math.max()) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return val >= min && val < max;
}

// export function twoDecimal(num: number) {
//   return Math.round(num * 100) / 100;
// }
