const { postService } = require('../services')
const { catchAsync }  = require('../utils/error')

const getAllPosts = catchAsync(async (req, res) => {
	const posts = await postService.getAllPosts();

	return res.status(200).json({ data : posts });
})

const getPosts = catchAsync(async (req, res) => {
	const userId = req.user.id

	const posts = await postService.getPostsByUserId(userId)

	res.status(200).json({ posts })
})

const createPost = catchAsync(async (req, res) => {
	const { title, content } = req.body
	const userId = req.user.id

	const insertId = await postService.createPost(title, content, userId)

	res.status(201).json({ insertId })
})

const updatePost = catchAsync(async (req, res) => {
	const { title, content } = req.body
	const postId = +req.params.postId
	const userId = req.user.id

	const post = await postService.updatePost(title, content, userId, postId)
	
	res.status(201).json({ post })
})

const deletePost = catchAsync(async (req, res) => {
	const postId = +req.params.postId
	const userId = req.user.id

	await postService.deletePost(postId, userId)

	res.status(204).send()
})

module.exports = {
	getAllPosts,
	getPosts,
	createPost,
	updatePost,
	deletePost
}
