import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  sortAsPerDate,
  sortAsPerNumber,
  sortAsPerText,
} from "./DataTable.helper";
import { IDataTable } from "./DataTable.types";

const theme = extendTheme({
  colors: {
    stripped: {
      100: "#f5f5f559",
    },
  },
});

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
    pageNo: 1,
    pageSize: 25,
    rows: rows,
  });
  const sortable = useMemo(() => {
    const temp: any = {};
    if (!rows.length) return temp;
    headers.forEach((key) => {
      console.log(typeof rows[0][key]);
      temp[key] = typeof rows[0][key] != "object" ? true : false;
    });
    return temp;
  }, [rows]);

  useEffect(() => {
    setData({ ...data, rows });
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
    setData({ ...data, fieldRefrence, direction, rows: sortedData });
  };

  console.log(sorting);

  return (
    <ChakraProvider theme={theme}>
      <TableContainer>
        <Table variant="striped" colorScheme="stripped">
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
                  <Th>
                    <Box
                      display="flex"
                      width="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>{value}</Box>
                      {sorting && sortable[value] && (
                        <Button
                          padding={`0.125rem`}
                          marginLeft={"auto"}
                          marginRight={0}
                          onClick={() => {
                            sortable[value] && sortingHandler(value);
                          }}
                          variant="ghost"
                        >
                          {data.fieldRefrence == value ? icons : <MinusIcon />}
                        </Button>
                      )}
                    </Box>
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
      {pagination && (
        <Box
          paddingY={3}
          paddingX={6}
          display="flex"
          gap={2}
          alignItems="center"
        >
          <Button>
            <ArrowLeftIcon boxSize={3} />
          </Button>
          {5}
          <Button>
            <ArrowRightIcon boxSize={3} />
          </Button>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default DataTable;
