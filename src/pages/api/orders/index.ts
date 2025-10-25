import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types";

let orders: Order[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(orders);
  } else if (req.method === "POST") {
    const { items, total } = req.body;
    const newOrder: Order = {
      id: crypto.randomUUID(),
      items,
      total,
      status: "pending",
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } else {
    res.status(405).end();
  }
}
