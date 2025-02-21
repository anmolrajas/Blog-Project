const BLOG = require('../model/blog');

const createBlog = async(req, res) => {
    if(!req.body){
        return res.status(400).json({error: "Request body is required"});
    }

    const {
        title, desc, categories, tags, created_by
    } = req.body;

    console.log("In the backend, Blogs:- ", title, desc, categories, tags, created_by)

    if(!title) return res.status(400).json({error: "Title is required"});
    if(!created_by.author_name) return res.status(400).json({error: "Author name is required"});

    const result = await BLOG.create({
        title: title,
        desc: desc,
        categories: categories,
        tags: tags,
        created_by: created_by,
    })

    console.log("In Controller after adding blog:- ", result);

    return res.status(201).json({msg: "Blog created successfully", _id: result._id});
}

const allBlogs = async(req, res) => {
    const result = await BLOG.find({});

    return res.status(200).json(result);
}

module.exports = {
    createBlog,
    allBlogs
}