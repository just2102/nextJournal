import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import Article from "@/models/articleModel";
import { getSession } from "next-auth/react";

const fetchArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const connection = await connectDB();
  const { user } = session;
  const myArticles = await Article.find({ "writer.email": user.email });
  res.status(200).json({ myArticles });
};

export default fetchArticles;
