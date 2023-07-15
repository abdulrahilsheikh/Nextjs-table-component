import DataTable from "@/componnets/DataTable/DataTable";
import { IDataTableRow } from "@/componnets/DataTable/DataTable.types";
import { headers, rows as data } from "@/mockdata/DataTable.mockdata";

import { Badge, Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const StatusBadge = ({ status }: any) => {
  const data = {
    pending: "teal",
  };
  return (
    <Badge borderRadius="full" px="2" colorScheme="teal">
      New
    </Badge>
  );
};

export default function Home() {
  const [rows, setRows] = useState<IDataTableRow[]>([]);

  useEffect(() => {
    const temp = data.map((item) => {
      item.Status = <StatusBadge />;
      return item;
    });

    setRows(temp);
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
