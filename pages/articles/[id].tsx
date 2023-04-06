import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "./[id].module.css"
import ArticleDataType from "@/Types/articleDataType";
import { articleAPI } from "@/utils/api";

interface Props {
    articleData: ArticleDataType
}

const Article = ({articleData}:Props) => {
    const {query} = useRouter();

    return (
        <>
        <article className={styles.article}>
            <h2>{articleData.title}</h2>
            <p className={styles.author}>{articleData.writer.name ? articleData.writer.name : articleData.writer.email}</p>
            <p className={styles.body}>{articleData.body}</p>
        </article>
        </>
     );
}


export const getServerSideProps:GetServerSideProps = async (context) => {
    const {id} = context.query; 
    const response = await articleAPI.getArticleByIdRequest(id)
    const articleData = response.data.article;
    return {
        props: {
            articleData,
        },
    };
};
 
export default Article;