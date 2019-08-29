const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs);
//   });
// });

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  if (typeof request.body.likes === "undefined") {
    request.body.likes = 0;
  }

  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    if (exception.name === "ValidationError") {
      response.status(400).json(exception);
    } else { response.status(500).json(exception);}
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end();
  } catch (exception) {
    response.status(400).json(exception);
  }
})

module.exports = blogsRouter;
