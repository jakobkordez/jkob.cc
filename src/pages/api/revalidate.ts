import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await Promise.all([
      res.revalidate("/gallery"),
      res.revalidate("/hamradio"),
    ]);
    return res.json({ message: "Revalidated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
