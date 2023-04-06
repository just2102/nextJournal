import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    writer: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.Article || mongoose.model("Article", articleSchema);