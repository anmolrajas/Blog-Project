const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: "",
    },
    categories: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String], 
        default: [],
    },
    created_by: {
        author_name: {
            type: String,
        },
        author_image: {
            type: String,
        }
    }
}, {timestamps: true});

const BLOG = mongoose.model("blog", blogSchema);

module.exports = BLOG; 
