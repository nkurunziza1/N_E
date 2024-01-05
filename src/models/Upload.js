import mongoose from "mongoose";

const documents = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    pdf: {
        type: String,
        // required: true
    }
})

export default mongoose.model("pdfDetails", documents)