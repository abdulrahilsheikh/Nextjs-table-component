export const sortAsPerText = (
  a: string,
  b: string,
  direction: "ASC" | "DESC"
) => {
  const first = a.charCodeAt(0);
  const second = b.charCodeAt(0);
  return direction == "ASC" ? first - second : second - first;
};
export const sortAsPerNumber = (
  a: number,
  b: number,
  direction: "ASC" | "DESC"
) => {
  return direction == "ASC" ? a - b : b - a;
};
export const sortAsPerDate = (
  a: string,
  b: string,
  direction: "ASC" | "DESC"
) => {
  const first = new Date(a).getTime();
  const second = new Date(b).getTime();
  console.log(first, second);

  return direction == "ASC" ? first - second : second - first;
};

export const filterIsEqualTo = (item: any, value: string) => {
  console.log(item == value);

  return item == value;
};
export const filterIsLessThan = (item: any, value: number) => {
  return item > value;
};
export const filterIsGreaterThan = (item: any, value: number) => {
  return item < value;
};
export const filterIncludes = (item: any, value: string) => {
  return `${item}`.includes(value);
};
