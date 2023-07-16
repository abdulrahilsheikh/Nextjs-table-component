import { Badge } from "@chakra-ui/react";

const StatusBadge = ({ status }: { status: string }) => {
  console.log(status);

  const colorScheme = {
    Pending: "yellow",
    Paid: "green",
    Failed: "red",
  }[status];

  return (
    <Badge borderRadius="full" px="2" colorScheme={colorScheme}>
      {status}
    </Badge>
  );
};
export default StatusBadge;
