import { IDataTableRow } from "./DataTable.types";

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

  return direction == "ASC" ? first - second : second - first;
};

export const filterIsEqualTo = (item: any, value: string) => {
  return item == value;
};
export const filterIsLessThan = (item: any, value: number) => {
  return item > value;
};
export const filterIsGreaterThan = (item: any, value: number) => {
  return item < value;
};
export const filterIncludes = (item: any, value: string) => {
  return `${item}`.toLowerCase().includes(value.toLowerCase());
};
export const csvDownloader = (csvHead: string[], data: IDataTableRow[]) => {
  const csvContent: string[] = [];
  data.forEach((item) => {
    const temp: string[] = [];
    csvHead.forEach((key) => {
      ///@ts-ignore
      temp.push(item[key]);
    });
    csvContent.push(temp.join(","));
  });
  const csv = csvHead.join(",") + "\n" + csvContent.join("\n");
  const downloadBtn = document.createElement("a");
  downloadBtn.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  downloadBtn.target = "_blank";
  downloadBtn.download = "data.csv";
  downloadBtn.click();
};
