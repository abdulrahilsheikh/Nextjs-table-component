import DataTable from "@/componnets/DataTable/DataTable";
import { headers, rows } from "@/mockdata/DataTable.mockdata";

import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <DataTable headers={headers} rows={rows} />
    </ChakraProvider>
  );
}
