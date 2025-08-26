import Blog from '../models/blog.js';


export const get_admin = async (req , res) => {

    const blog = await Blog.find();

    res.render('admin' , {user : req.user , blogs : blog });
}

export const get_new_blog = (req , res) => {

    res.render('post')
}

export const get_blog = async (req , res) => {

    try{

        const  {blogId} = req.params;

        const blog = await Blog.findById(blogId);
        
        res.render('blogAdmin' , {blog})

    }catch(err){
        console.log(err);
    }
}

export const update_blog = async (req , res) => {

    try{

        const {blogId} = req.params;

        const {title , description} = req.body;

        const newUpdateBlog = await Blog.findByIdAndUpdate(blogId , {title , description} ,{new: true});

        if(!newUpdateBlog){
            return res.json({error : 'update unsuccesful'})
        }

        res.json({success : newUpdateBlog._id})

    }catch(err){
        console.log(err);

        res.json({error: 'server error'})
    }
}

export const delete_blog = async (req , res) => {

    try{

        const {blogId} = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(deletedBlog){
            return res.json({success : deletedBlog});
        }

        res.json({error : `blog with id ${blogId} cant be deleted`})

    }catch(err){
        console.log(err);

        res.json({error : err});
    }

}

export const post_new_blog = async (req , res) => {

    const {title , description} = req.body;

    const blog = new Blog({title , description});
    const isSave = await blog.save();

    res.redirect('/admin');
}

export const get_comment = async (req , res) => {

    const {blogId} = req.params;

    try{

        const blog = await Blog.findById(blogId);

        const comments = blog.comments;

        res.render('commentAdmin' , {comments , title : blog.title , id : blog._id});


    }catch(err){
        console.log(err);
    }
}

export const delete_comment = async (req , res) => {

    try{

        const {blogId , commentId} = req.params;

        const blog = await Blog.findById(blogId);

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {$pull : {comments: {_id : commentId}}},
            {new: true}
        )

        if(!updatedBlog){
            return res.status(500).json({error : 'Blog doesnt exist'})
        }

        res.json({success : updatedBlog});


    }catch(err){
        console.log(err);
        res.json({error : err.message})
    }
}