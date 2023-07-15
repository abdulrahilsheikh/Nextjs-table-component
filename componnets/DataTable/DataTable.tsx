import React, { useMemo, useState } from "react";
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
  Button,
} from "@chakra-ui/react";
import { IDataTable } from "./DataTable.types";
import {
  sortAsPerText,
  sortAsPerDate,
  sortAsPerNumber,
} from "./DataTable.helper";
import { TriangleDownIcon, TriangleUpIcon, MinusIcon } from "@chakra-ui/icons";

const DataTable = ({
  caption,
  headers = [],
  rows = [],
  pagination = false,
  sorting = false,
}: IDataTable) => {
  const [data, setData] = useState({
    fieldRefrence: "",
    direction: "DESC",
    rows: rows,
  });
  const sortable = useMemo(() => {
    const temp: any = {};
    headers.forEach((key) => {
      console.log(typeof rows[0][key]);
      temp[key] = typeof rows[0][key] != "object" ? true : false;
    });
    return temp;
  }, [rows]);

  const sortingHandler = (fieldRefrence: string) => {
    const direction =
      data.fieldRefrence == fieldRefrence
        ? data.direction == "DESC"
          ? "ASC"
          : "DESC"
        : "ASC";

    const sortedData = [...data.rows].sort((a, b) => {
      const first = a[fieldRefrence] as string;
      const second = b[fieldRefrence] as string;
      if (!Number.isNaN(+first)) {
        console.log("number");
        return sortAsPerNumber(+first, +second, direction);
      } else if (new Date(first).toString() != "Invalid Date") {
        console.log("date");
        return sortAsPerDate(first, second, direction);
      } else {
        console.log("text");
        return sortAsPerText(first, second, direction);
      }
    });
    setData({ fieldRefrence, direction, rows: sortedData });
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          {!!caption && <TableCaption>{caption}</TableCaption>}
          <Thead>
            <Tr>
              {headers.map((value, idx) => {
                const icons =
                  data.direction == "ASC" ? (
                    <TriangleDownIcon />
                  ) : (
                    <TriangleUpIcon />
                  );
                return (
                  <Th alignContent="center">
                    <span> {value}</span>
                    {sortable[value] && (
                      <Button
                        marginLeft={24}
                        onClick={() => {
                          sortable[value] && sortingHandler(value);
                        }}
                        variant="ghost"
                      >
                        {data.fieldRefrence == value ? icons : <MinusIcon />}
                      </Button>
                    )}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.rows.map((item, idx) => (
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
