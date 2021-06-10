import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function (req: NextApiRequest, res: NextApiResponse) {

    const key = "PBX1_151502"
  if (!req.body) {
    res.send("Error");
  } else {
    const { name, password } = req.body;
    console.log(name, password);
    res.json({
        token: jwt.sign({
            name,
            admin: name === 'admin' && password ==='admin'
        } , key)
    })
    // res.status(200).json({ status: "ok" });
  }
}
