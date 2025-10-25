import { NextApiRequest, NextApiResponse } from "next";

let orders: any[] = []; // Same array as above

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.query;
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex !== -1) {
      orders.splice(orderIndex, 1);
      res.status(200).json({ message: "Order cleared" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } else {
    res.status(405).end();
  }
}
