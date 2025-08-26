import mongoose from "mongoose";


const commentSchema = mongoose.Schema({

    author: {
        type: String,
        required: false
    },

    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const blogSchema = mongoose.Schema({

    title:{
        type:String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    comments: [commentSchema],

},{timestamps: true});

const blog = mongoose.model('blog' , blogSchema);

export default blog;