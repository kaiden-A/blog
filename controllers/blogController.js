import Blog from "../models/blog.js";

export const get_homepage = async (req , res) => {

    const allBlog = await Blog.find().sort({ createdAt: -1 });


    res.render('index' , {blogs : allBlog});
}

export const get_blog = async (req , res) => {

    try{
        const {blogId} = req.params;

        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(500).json({"Error" : "blog doesnt exist"});
        }

        res.render('blog' , {blog});

    }catch(err){
        res.status(500).json({"Error" : "Server Error"});
    }


}

export const post_comment = async (req , res) => {

    console.log('Hello World')

    try{

        const {blogId} = req.params;
        const {author , text} = req.body;

        console.log('author: ' +  author);

        const blog = await Blog.findById(blogId);

        if(!blog){
           return res.status(500).json({error : "blog doesnt exist"}); 
        }

        blog.comments.push({author , text});
        const comment = await blog.save();

        res.json({success: comment })


    }catch(err){

        res.status(500).json({error : "Server Error"});
    }

}