const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  if (typeof request.body.likes === "undefined") {
    request.body.likes = 0;
  }
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog(request.body);
    blog.user = user._id;
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result.toJSON());
  } catch (exception) {
    if (exception.name === "ValidationError") {
      response.status(400).json(exception);
    } else {
      response.status(500).json(exception);
    }
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    response.status(400).json(exception);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog.likes = request.body.likes;
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    response.status(400).json(exception);
  }
});

module.exports = blogsRouter;
