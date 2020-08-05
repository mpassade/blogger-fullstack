const express = require('express')
const router = express.Router()
const Blog = require('./models/blogModel')

router.get('/all-blogs', (req, res) => {
  Blog.find().then(blogs => {
    return res.json({blogs})
  })
})
router.get('/single-blog/:id', (req, res) => {
  Blog.findById(req.params.id).then(blog => {
    return res.json({blog})
  })
})
router.post('/create-blog', (req, res) => {
  const {title, author, subject, article} = req.body
  const newBlog = new Blog()
  newBlog.title = title
  newBlog.author = author
  newBlog.subject = subject
  newBlog.article = article
  newBlog.save().then(blog => {
    return res.json({blog})
  })
})
router.put('/update-blog/:id', (req, res) => {
  const {title, author, subject, article} = req.body
  Blog.findById(req.params.id).then(blog => {
    blog.title = title ? title : blog.title
    blog.author = author ? author : blog.author
    blog.subject = subject ? subject : blog.subject
    blog.article = article ? article : blog.article
    blog.save().then(savedBlog => {
      return res.json({blog: savedBlog})
    })
  })
})
router.delete('/delete-blog/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id).then(deletedBlog => {
    return res.json({deletedBlog})
  })
})

module.exports = router
