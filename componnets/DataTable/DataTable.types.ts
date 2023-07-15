export interface IDataTable {
  caption?: string;
  headers: IDataTableHeader;
  rows: IDataTableRow[];
  pagination?: boolean;
  sorting?: boolean;
}
export interface IDataTableRow {
  [key: string]: string | boolean | number | JSX.Element;
}

export type IDataTableHeader = string[];
