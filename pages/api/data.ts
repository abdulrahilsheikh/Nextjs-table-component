// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IDataTableRow } from "@/componnets/DataTable/DataTable.types";
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDataTableRow[]>
) {
  const data: IDataTableRow[] = [];
  for (let i = 0; i < 100; i++) {
    const temp: any = {};
    temp.status = faker.helpers.arrayElement(["Pending", "Failed", "Paid"]);
    temp.timestamp = faker.date.anytime();
    temp.mail = faker.date.anytime();
    temp.name = faker.person.fullName();
    temp.mail = faker.internet.email({ firstName: temp.name.split(" ")[0] });
    temp.source = faker.helpers.arrayElement([
      "Online Store",
      "Shop",
      "Facebook ads",
    ]);
    data.push(temp);
  }
  res.status(200).json(data);
}
