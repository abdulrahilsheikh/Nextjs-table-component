import { Badge } from "@chakra-ui/react";

const StatusBadge = ({ status }: { status: string }) => {
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
