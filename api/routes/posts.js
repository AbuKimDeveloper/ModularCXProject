const router = require("express").Router();
const post = require("../controllers/posts");
const catchAsync = require("express-async-handler")
const {validatePost} = require("../middleware");


router.route("/")
.get(catchAsync(post.getPosts))
.post(validatePost,catchAsync(post.createPost));


router.route("/:id")
.get(catchAsync(post.getPost))
.put(validatePost,catchAsync(post.updatePost))
.delete(catchAsync(post.deletePost));


module.exports = router;
