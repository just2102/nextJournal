import { useForm } from "react-hook-form";
import styles from "./AddArticleModal.module.css"
import NewArticleType from "@/Types/newArticleType";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
// import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";

interface Inputs {
    title: string;
    body: string;
}

const poster = async(url:string, data:any) => {
    const response = await axios.post(url, data)
    return response
}

const AddArticleModal = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit = async(formInputs:any) => {
        if (session?.user?.email) {
            const newArticle:NewArticleType = {
                title: formInputs.title,
                body: formInputs.body,
                writer: {
                    email: session.user.email,
                    name: session.user.name,
                },
                date: Date.now(),
            }
        const response = await poster("/api/articles", newArticle);
        if (response.status === 201) {
            router.push("/articles");
        }
        }
    }
    

    return ( 
        // <Box sx={style}>
        <div className={styles.addArticleModal}>
            <Typography variant="h6" component="h2">Add a new article!</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" placeholder={`Enter new title...`} {...register("title", {required: true})} />

                <label htmlFor="body">Body</label>
                <textarea id="body" placeholder={`Enter new article...`} {...register("body", {required: true})} />
                <input className={styles.submit} type="submit" value={"Post"} />
            </form>
            {/* count body length and display it  */}
            <p>Symbols: {watch("body")?.length}</p>
        </div>
        // </Box>
     );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
 
export default AddArticleModal;