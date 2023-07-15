import React from "react";
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

const DataTable = ({ caption, headers = [] }: IDataTable) => {
  return (
    <TableContainer>
      <Table variant="simple">
        {!!caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            {headers.map((value, idx) => (
              <Th>{value}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
