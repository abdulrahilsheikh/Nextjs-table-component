import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  HamburgerIcon,
  MinusIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  CircularProgress,
  extendTheme,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  filterIncludes,
  filterIsEqualTo,
  filterIsGreaterThan,
  filterIsLessThan,
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
  filter = false,
  loader = false,
  pageSizes = [5, 10, 25, 50],
}: IDataTable) => {
  const filterRef = useRef<any>({});
  const [data, setData] = useState({
    fieldRefrence: "",
    direction: "DESC",
    rows: rows,
  });
  const [paginationInfo, setPaginationInfo] = useState({
    nextPage: true,
    prevPage: false,
    currentPage: 1,
    pageSize: 5,
  });

  const stringValues = useMemo(() => {
    const temp: any = {};
    const valid = new Set(["number", "string", "object"]);
    if (!rows.length) return temp;
    headers.forEach((key) => {
      temp[key] = typeof rows[0][key];
      if (!valid.has(temp[key])) {
        temp[key] = "object";
      }
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
        return sortAsPerNumber(+first, +second, direction);
      } else if (new Date(first).toString() != "Invalid Date") {
        return sortAsPerDate(first, second, direction);
      } else {
        return sortAsPerText(first, second, direction);
      }
    });
    setData({ ...data, fieldRefrence, direction, rows: sortedData });
  };
  const filterHandler = (filterParams: any, field: string) => {
    filterParams.applied = true;
    console.log(filterParams);
    const filteredData = data.rows.filter((item) => {
      if (filterParams.type == "==") {
        return filterIsEqualTo(item[field], filterParams.value);
      } else if (filterParams.type == "<") {
        return filterIsLessThan(item[field], +filterParams.value);
      } else if (filterParams.type == ">") {
        return filterIsGreaterThan(item[field], +filterParams.value);
      } else if (filterParams.type == "inc") {
        return filterIncludes(item[field], filterParams.value);
      }
    });
    console.log(filteredData);

    setData({ ...data, rows: filteredData });
  };

  const filterClearHandler = () => {
    headers.forEach((item) => {
      if (filterRef.current[item]) {
        filterRef.current[item].applied = false;
      }
    });
    setPaginationInfo({ ...paginationInfo, currentPage: 1 });
    setData({ ...data, rows: rows });
  };

  const loopData = pagination
    ? data.rows.slice(
        paginationInfo.currentPage - 1,
        paginationInfo.currentPage + paginationInfo.pageSize
      )
    : data.rows;

  const paginate = (
    (totalItems) =>
    ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
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
  console.log(filterRef, sorting);

  return (
    <ChakraProvider theme={theme}>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="stripped">
          {!!caption && (
            <TableCaption placement="top" textAlign="start" fontWeight="bold">
              {caption}
            </TableCaption>
          )}
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
                      <Box
                        marginLeft={"auto"}
                        display="flex"
                        alignItems="center"
                        gap="2"
                        marginRight={0}
                      >
                        {sorting && stringValues[value] != "object" && (
                          <Button
                            padding={`0.125rem`}
                            onClick={() => {
                              stringValues[value] && sortingHandler(value);
                            }}
                            variant="ghost"
                          >
                            {data.fieldRefrence == value ? (
                              icons
                            ) : (
                              <MinusIcon />
                            )}
                          </Button>
                        )}
                        {filter && stringValues[value] != "object" && (
                          <Menu closeOnSelect={false}>
                            {({ onClose }) => {
                              if (!filterRef.current[value]) {
                                filterRef.current[value] = {
                                  type: "",
                                  value: "",
                                  applied: false,
                                };
                              }
                              const selector = filterRef.current[value];

                              return (
                                <>
                                  <MenuButton
                                    colorScheme={
                                      selector.applied ? "teal" : "gray"
                                    }
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                  ></MenuButton>
                                  <MenuList
                                    key={stringValues[value]}
                                    minWidth="240px"
                                  >
                                    <Input
                                      placeholder="Value to filter"
                                      onChange={(e) => {
                                        selector.value = e.target.value;
                                      }}
                                    />
                                    <MenuOptionGroup
                                      defaultValue={selector.type}
                                      title="Fiter Type"
                                      type="radio"
                                      onChange={(e: any) => {
                                        console.log(e);
                                        selector.type = e;
                                      }}
                                    >
                                      <MenuItemOption value="==">
                                        Is Equal to
                                      </MenuItemOption>
                                      {stringValues[value] == "number" ? (
                                        <MenuItemOption value="<">
                                          Is Less Than
                                        </MenuItemOption>
                                      ) : null}
                                      {stringValues[value] == "number" ? (
                                        <MenuItemOption value=">">
                                          Is Greater Than
                                        </MenuItemOption>
                                      ) : null}
                                      <MenuItemOption value="inc">
                                        Includes
                                      </MenuItemOption>
                                    </MenuOptionGroup>
                                    <Box
                                      paddingY="2"
                                      paddingX="8"
                                      display="flex"
                                      justifyContent="space-between"
                                    >
                                      <Button
                                        onClick={() => {
                                          filterHandler(selector, value);
                                          onClose();
                                        }}
                                      >
                                        Apply
                                      </Button>
                                      <Button
                                        colorScheme={"red"}
                                        onClick={() => {
                                          filterClearHandler();
                                          onClose();
                                        }}
                                      >
                                        Clear All
                                      </Button>
                                    </Box>
                                  </MenuList>
                                </>
                              );
                            }}
                          </Menu>
                        )}
                      </Box>
                    </Box>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {!!loopData.length ? (
              loopData.map((item, idx) => (
                <Tr>
                  {headers.map((value, idx) => (
                    <Td>{item[value]}</Td>
                  ))}
                </Tr>
              ))
            ) : loader ? (
              <Tr>
                <Td colSpan={headers.length}>
                  <Box
                    padding={24}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CircularProgress isIndeterminate color="gray" />
                  </Box>
                </Td>
              </Tr>
            ) : null}
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
