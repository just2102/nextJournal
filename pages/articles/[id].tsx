
import instance from "@/utils/axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "./[id].module.css"


const Article = ({articleData}:any) => {
    const {query} = useRouter();
    console.log(articleData)

    return (
        <>
        <article className={styles.article}>
            <h2>{articleData.title}</h2>
            <p>Author: {articleData.writer.name}</p>
            <p>{articleData.body}</p>
        </article>
        </>
     );
}


export const getServerSideProps:GetServerSideProps = async (context) => {
    const {id} = context.query; 
    const response = await instance.get(`/articles/${id}`);
    const articleData = response.data.article;
    return {
        props: {
            articleData,
        },
    };
};
 
export default Article;