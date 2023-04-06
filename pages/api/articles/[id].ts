import Article from "@/models/articleModel";
// import Writer from "@/models/writerModel";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function articleHandler(req: NextApiRequest,res: NextApiResponse) {
  const connection = await connectDB();

  const { query } = req;
  const { id } = query;
  let article;
  switch(req.method) {
    case "GET":
      article = await Article.findOne({_id:id})
      res.status(200).json({ article });
      break;
    case "PUT":
      const { newTitle, newBody } = req.body;
      article = await Article.findByIdAndUpdate(id, {title:newTitle, body:newBody}, {new:true})
      res.status(200).json({ article });
      break;
    case "DELETE":
      article = await Article.findByIdAndDelete(id)
      res.status(200).json({ article });
      break;
  }

}
