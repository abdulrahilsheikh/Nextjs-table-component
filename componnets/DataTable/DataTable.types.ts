export interface IDataTable {
  caption?: string;
  headers: IDataTableHeader;
  rows: IDataTableRow[];
  pagination?: boolean;
  sorting?: boolean;
  loader?: boolean;
  pageSizes?: number[];
}
export interface IDataTableRow {
  [key: string]: string | boolean | number | JSX.Element;
}

export type IDataTableHeader = string[];
