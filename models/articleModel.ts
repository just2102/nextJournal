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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writer"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.Article || mongoose.model("Article", articleSchema);