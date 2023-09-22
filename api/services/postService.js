const { postDao } = require('../models')

const getAllPosts = async () => {
	return await postDao.getAllPosts()
}

const getPostsByUserId = async (userId) => {
	return await postDao.getPostsByUserId(userId)
}

const createPost = async (title, content, userId) => {
	return await postDao.createPost(title, content, userId)
}

const deletePost = async (postId, userId) => {
	return await postDao.deletePost(postId, userId)
}

const updatePost = async (title, content, userId, postId) => {
	const post = await postDao.getPostById(postId)

	return await postDao.updatePost(
		title ? title : post.title,
		content ? content : post.content,
		userId, 
		postId
	)
}

module.exports = { 
	getAllPosts,
	getPostsByUserId,
	createPost,
	updatePost,
	deletePost
}
