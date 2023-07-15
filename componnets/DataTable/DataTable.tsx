import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { IDataTable } from "./DataTable.types";

const DataTable = ({
  caption,
  headers = [],
  rows = [],
  pagination = false,
  sorting = false,
}: IDataTable) => {
  const sortable = useMemo(() => {
    const temp: any = {};
    headers.forEach((key) => {
      console.log(typeof rows[0][key]);
      temp[key] = typeof rows[0][key] != "object" ? true : false;
    });
    return temp;
  }, [rows]);
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          {!!caption && <TableCaption>{caption}</TableCaption>}
          <Thead>
            <Tr>
              {headers.map((value, idx) => (
                <Th
                  onClick={() => {
                    sortable[value] && console.log(value);
                  }}
                >
                  {value}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((item, idx) => (
              <Tr>
                {headers.map((value, idx) => (
                  <Td>{item[value]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {pagination && <div>Pagination</div>}
    </>
  );
};

export default DataTable;
