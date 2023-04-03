import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next'
import Article from '@/models/articleModel';


const fetchArticles = async(req: NextApiRequest, res: NextApiResponse) => {
    const connection = await connectDB();

    switch(req.method) {
        case "GET":
            const articles = await Article.find();
            res.status(200).json({ articles });
            break;
        case "POST":
            const newArticle = req.body;
            const article = await Article.create(newArticle);
            res.status(201).json({ article, message: "ARTICLE CREATED" });
    }
}

export default fetchArticles;