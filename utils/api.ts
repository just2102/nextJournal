import ArticleDataType from "@/Types/articleDataType"
import instance from "./axios"

interface ArticleData {
    _id: any;
    newTitle: string;
    newBody: string
}
export const articleAPI = {
    editArticleRequest: (articleData:ArticleData) => {
        return instance.put(`/articles/${articleData._id}`, articleData)
    },
    getArticleByIdRequest: (id:any) => {
        return instance.get(`/articles/${id}`)
    },
    deleteArticleByIdRequest: (id:any) => {
        return instance.delete(`/articles/${id}`)
    }
}