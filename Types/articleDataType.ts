import WriterType from "./writerType";

type ArticleDataType = {
    _id?: string;
    title: string;
    body: string;
    writer: WriterType
};

export default ArticleDataType;