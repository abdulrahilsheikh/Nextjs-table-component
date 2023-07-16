import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MinusIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
const pageSizes = [10, 20, 50, 100];
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
  const [paginationInfo, setPaginationInfo] = useState({
    nextPage: true,
    prevPage: false,
    currentPage: 1,
    pageSize: 10,
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

  const loopData = pagination
    ? data.rows.slice(
        paginationInfo.currentPage,
        paginationInfo.currentPage + paginationInfo.pageSize
      )
    : data.rows;

  const paginate = (
    (totalItems) =>
    ({ currentPage, pageSize }: any) => {
      const totalPages = Math.ceil(totalItems / pageSize);
      if (currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      setPaginationInfo({
        nextPage: currentPage != totalPages,
        prevPage: currentPage > 1,
        pageSize,
        currentPage,
      });
    }
  )(data.rows.length);

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
            {loopData.map((item, idx) => (
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
          <Button
            onClick={() =>
              paginationInfo.prevPage &&
              paginate({
                ...paginationInfo,
                currentPage: paginationInfo.currentPage - 1,
              })
            }
          >
            <ArrowLeftIcon boxSize={3} />
          </Button>
          {paginationInfo.currentPage}
          <Button
            onClick={() =>
              paginationInfo.nextPage &&
              paginate({
                ...paginationInfo,
                currentPage: paginationInfo.currentPage + 1,
              })
            }
          >
            <ArrowRightIcon boxSize={3} />
          </Button>
          <Menu>
            <>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {paginationInfo.pageSize}
              </MenuButton>
              <MenuList width={12}>
                {pageSizes.map((item) => (
                  <MenuItem
                    onClick={() =>
                      paginate({
                        ...paginationInfo,
                        pageSize: item,
                      })
                    }
                  >
                    {item}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          </Menu>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default DataTable;
