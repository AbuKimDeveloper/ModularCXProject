const Post = require("../models/Post");

const getPosts = async (req,res)=>{
    const posts = await Post.find({})
    res.status(200).json(posts)
}

const getPost = async(req,res)=>{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
}

const createPost = async (req,res) =>{
    const post = new Post(req.body);
    await post.save();

    res.status(200).json({
        success:true,
        message:"Post was saved successfully"
    })
}

const updatePost = async(req,res)=>{
    const {id} = req.params
    const {title,author,content} = req.body
    const editPost = await Post.findByIdAndUpdate(id,{title,author,content});
    return res.status(200).json({
        success:true,
        message:"Post was updated successfully"
    })
}


const deletePost = async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).json({
        success:true,
        message:"Post was deleted successfully"
    })
}


module.exports ={
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts    
}

