import DataTable from "@/componnets/DataTable/DataTable";
import { IDataTableRow } from "@/componnets/DataTable/DataTable.types";
import StatusBadge from "@/componnets/StatusBadge/StatusBadge";
import { headers, rows as data } from "@/mockdata/DataTable.mockdata";

import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [rows, setRows] = useState<IDataTableRow[]>([]);

  useEffect(() => {
    const temp = data.map((item) => {
      const status: any = item.Status;
      return {
        ...item,
        Status: <StatusBadge status={status} />,
        Select: (
          <Button
            onClick={() => alert(`Product ID : ${item.PurchaseID} \nClicked`)}
          >
            Select
          </Button>
        ),
      };
    });
    const bulkData = [];
    for (let i = 0; i < 20; i++) {
      bulkData.push(...temp);
    }
    setRows(bulkData);
  }, []);

  return (
    <ChakraProvider>
      <Box padding={8}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <DataTable sorting pagination headers={headers} rows={rows} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
