import { useRouter } from "next/router";
import { Modal } from "@mui/material";
import { useState } from "react";
import AddArticleModal from "@/components/Modals/AddArticleModal";
import instance from "@/utils/axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import MyArticle from "@/components/MyArticle/MyArticle";

const fetcher = async (url: string) => {
  const response = await instance.get(url);
  return response.data.myArticles;
};

const MyArticles = () => {
    const router = useRouter();
    const [addArticleModalOpen, setAddArticleModalOpen] = useState(false);

    const {data:articlesData, error} = useSWR(`/myArticles`, fetcher);
    const articlesDataMapped = articlesData?.map((article:any) => {
        return <MyArticle key={article._id} articleData={article}/>
    })

    
    return ( 
        <div>
            <h1>My Articles</h1>
            <h3>New article</h3>
            <button onClick={() => setAddArticleModalOpen(true)}>Add article</button>
            {articlesDataMapped}
            <Modal
                aria-labelledby="add new article"
                aria-describedby="enter title and description to add a new article"
                open={addArticleModalOpen}
                onClose={() => setAddArticleModalOpen(false)}
            >
                <AddArticleModal />
            </Modal>
        </div>
     );
}

 
export default MyArticles;