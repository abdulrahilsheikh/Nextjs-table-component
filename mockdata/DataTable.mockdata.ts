import { IDataTableRow } from "@/componnets/DataTable/DataTable.types";

export const rows: IDataTableRow[] = [
  {
    Timestamp: "2023-07-15 12:34:56",
    PurchaseID: "123456789",
    Mail: "example@mail.com",
    Name: "John Doe",
    Source: "Online Store",
    Status: "Completed",
    Select: true,
  },
  {
    Timestamp: "2023-07-14 09:21:35",
    PurchaseID: "987654321",
    Mail: "another@example.com",
    Name: "Jane Smith",
    Source: "Physical Store",
    Status: "Pending",
    Select: false,
  },
  {
    Timestamp: "2023-07-13 18:45:21",
    PurchaseID: "456789123",
    Mail: "user@example.net",
    Name: "Alex Johnson",
    Source: "Online Store",
    Status: "Completed",
    Select: true,
  },
  {
    Timestamp: "2023-07-12 10:30:15",
    PurchaseID: "789123456",
    Mail: "test@example.com",
    Name: "Emily White",
    Source: "Physical Store",
    Status: "Pending",
    Select: false,
  },
];

export const headers = Object.keys(rows[0]);
