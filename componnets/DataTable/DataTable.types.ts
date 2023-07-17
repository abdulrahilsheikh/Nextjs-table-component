export interface IDataTable {
  caption?: string;
  headers: IDataTableHeader;
  rows: IDataTableRow[];
  pagination?: boolean;
  sorting?: boolean;
  filter?: boolean;
  loader?: boolean;
  exportCsv?: boolean;
  pageSizes?: number[];
}
export interface IDataTableRow {
  [key: string]: string | boolean | number | JSX.Element;
}
export interface IFilterParm {
  [key: string]: FiterOption;
}
export type FiterOption = {
  value: string;
  type: string;
  applied: boolean;
};

export type IDataTableHeader = string[];
