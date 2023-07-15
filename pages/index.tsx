import DataTable from "@/componnets/DataTable/DataTable";

import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <DataTable />
    </ChakraProvider>
  );
}
