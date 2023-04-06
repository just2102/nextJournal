import { useState } from "react";
import styles from "./MyArticle.module.css";
import MyArticleModal from "./MyArticleModal";
import { useRouter } from "next/router";
import { articleAPI } from "@/utils/api";

interface Props {
  article: any;
}

const MyArticle = ({ article }: Props) => {
  const router = useRouter();
  const formattedBody = article.body.slice(0, 100);

  const [isOpen, setIsOpen] = useState(false);
  const onModalClose = () => {
    setIsOpen(false);
  };
  const onModalOpen = () => {
    setIsOpen(true);
  };

  const onDelete = async () => {
    const response = await articleAPI.deleteArticleByIdRequest(article._id);
    if (response.status === 200) {
      router.replace(router.asPath);
    }
  };

  return (
    <>
      <article className={styles.myArticle}>
        <h2>{article.title}</h2>
        <p>
          {formattedBody}
          <span>....</span>
        </p>
        <div className={styles.actions}>
          <button onClick={onModalOpen}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </article>
      <MyArticleModal
        selectedArticle={article}
        isOpen={isOpen}
        onModalClose={onModalClose}
      ></MyArticleModal>
    </>
  );
};

export default MyArticle;
