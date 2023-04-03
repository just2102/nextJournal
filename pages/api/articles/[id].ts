import Article from "@/models/articleModel";
import Writer from "@/models/writerModel";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function articleHandler(req: NextApiRequest,res: NextApiResponse) {
  const connection = await connectDB();

  const { query } = req;
  const { id } = query;

  const article = await Article.findOne({_id:id}).populate({path:"writer",model:Writer});
  res.status(200).json({ article });
}
