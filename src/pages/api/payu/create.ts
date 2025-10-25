import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { amount, firstname, email, phone, productinfo } = req.body;

    const txnid = `txn_${Date.now()}`;
    const key = process.env.PAYU_MERCHANT_KEY!;
    const salt = process.env.PAYU_SALT!;

    // Generate hash: key|txnid|amount|productinfo|firstname|email|||||||||||salt
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    res.status(200).json({
      key,
      txnid,
      amount,
      firstname,
      email,
      phone,
      productinfo,
      surl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      furl: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
      hash,
      action: process.env.PAYU_ACTION,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PayU hash generation failed" });
  }
}
