import Link from "next/link";
import styles from "./index.module.css";
import { GetServerSideProps } from "next";
import instance from "@/utils/axios";


const Articles = ({articlesData}:any) => {
  const articlesMappedAsLinks = articlesData?.map((article: any) => {
    const formattedBody = article.body.slice(0, 50);
    return (
      <div className={styles.articleLink} key={article._id}>
        <Link href={`/articles/${article._id}`}>{article.title}</Link>
        <p>
          {formattedBody}...{" "}
          <Link href={`/articles/${article._id}`}>read more</Link>{" "}
        </p>
      </div>
    );
  });
  return (
    <>
      <div className={styles.articles}>
        <h1>Articles</h1>
        {articlesMappedAsLinks}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await instance.get("/articles");
  const articlesData = response.data.articles;
  console.log(articlesData)
  return {
    props: {
      articlesData,
    },
  };
};

export default Articles;
