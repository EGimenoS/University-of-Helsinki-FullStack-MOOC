const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require('../models/blog')

const api = supertest(app);
const initialBlogs = require('../utils/bloglist_test').blogs

beforeEach(async() => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe("the response is correct when hitting GET /blogs", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("it returns the correct number of blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body.length).toBe(initialBlogs.length);
  })
});

afterAll(() => {
  mongoose.connection.close();
});
