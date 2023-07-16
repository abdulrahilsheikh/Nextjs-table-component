import DataTable from "@/componnets/DataTable/DataTable";
import { IDataTableRow } from "@/componnets/DataTable/DataTable.types";
import StatusBadge from "@/componnets/StatusBadge/StatusBadge";
import { headers } from "@/utils/constants";

import { getDataFromServer } from "@/utils/http";

import {
  Box,
  Button,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [rows, setRows] = useState<IDataTableRow[]>([]);

  const getData = async () => {
    try {
      const data: IDataTableRow[] = await getDataFromServer();
      const temp = data.map((item) => {
        const status: any = item.status;
        return {
          ...item,
          status: <StatusBadge status={status} />,
          select: (
            <Button
              onClick={() => alert(`Product ID : ${item.PurchaseID} \nClicked`)}
            >
              Select
            </Button>
          ),
        };
      });
      setRows(temp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ChakraProvider>
      <Box padding={8}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>With Sorting</Tab>
            <Tab>With Pagination</Tab>
            <Tab>With Both</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <DataTable loader sorting headers={headers} rows={rows} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <DataTable loader pagination headers={headers} rows={rows} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <DataTable
                  loader
                  sorting
                  pagination
                  headers={headers}
                  rows={rows}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}
