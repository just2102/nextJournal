import useSWR from "swr";
import axios from "axios"
import { useForm } from "react-hook-form";

interface Inputs {
    title: string;
    body: string;
    // writer: string;
    // date: string;
}


const poster = async(url:string, data:any) => {
    const response = await axios.post(url, data)
    return response
  }
const MyArticles = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit = async(formInputs:any) => {
        const newArticle = {
            title: formInputs.title,
            body: formInputs.body,
            writer: "6429820508040081c7eae017",
            date: Date.now(),
        }
        const response = await poster("/api/articles", newArticle);
        console.log(response);
    }

    return ( 
        <div>
            <h1>My Articles</h1>
            <h3>New article</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title", {required: true})} />
                <input type="text" placeholder="Content" {...register("body", {required: true})} />
                <input type="submit" value={"Post"} />
            </form>
        </div>
     );
}
 
export default MyArticles;