import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import styles from "./MyArticleModal.module.css"
import { useForm } from "react-hook-form";
import { articleAPI } from "@/utils/api";
import ArticleDataType from "@/Types/articleDataType";
import { useRouter } from "next/router";

interface Props {
    selectedArticle: ArticleDataType;
    isOpen: boolean;
    onModalClose: () => void;
    onEdit: (data:any) => void;
}


const MyArticleModal = ({selectedArticle, isOpen, onModalClose, onEdit}:Props) => {
    const router = useRouter();
    const {register, handleSubmit} = useForm();
    const [editMode, setEditMode] = useState(false);


    const onSubmit = async(data:any) => {
        const newArticleData = {
            _id: selectedArticle._id,
            newTitle: data.newTitle,
            newBody: data.newBody,
        }
        const response = await onEdit(newArticleData)
        setEditMode(false);
        onModalClose();
    }

    return (
        <>
        {isOpen &&
            <Modal
                aria-labelledby="my article info"
                aria-describedby="my article info"
                open={true}
                onClose={onModalClose}
            >
            <Box sx={style} >
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                {editMode && <button onClick={()=>setEditMode(false)}>X</button>}
                    {!editMode 
                    ? <h1 className={styles.heading}>{selectedArticle.title}<button onClick={()=>setEditMode(true)}>Edit</button></h1>
                    :<input {...register("newTitle")} type="text" defaultValue={selectedArticle.title} />}

                    {!editMode
                    ? <p className={styles.body}>{selectedArticle.body}</p>
                    : <textarea {...register("newBody")} defaultValue={selectedArticle.body}></textarea>}
                {editMode && <input className={styles.submit} type="submit" value={"Edit!"}/>}
                </form>

            </Box>
            </Modal>
        }
        </>
     );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 
export default MyArticleModal;