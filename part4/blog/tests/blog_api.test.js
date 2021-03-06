const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);
const initialBlogs = require("../utils/bloglist_test").blogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("the response is correct when hitting GET /blogs", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("it returns the correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("id property is correctly named as id, not _id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("new Blogs can be added correctly", () => {
  const newBlog = {
    title: "Angular University",
    author: "Vasco",
    url: "blog.angularuniversity.io",
    likes: 0,
    userId: "5d67d401c857dc2e0082d87d"
  };
  const newBlogWithNoLikes = {
    title: "Angular University",
    author: "Vasco",
    url: "blog.angularuniversity.io",
    userId: "5d67d401c857dc2e0082d87d"
  };
  const newBlogWithNoTitle = {
    title: "",
    author: "Vasco",
    url: "blog.angularuniversity.io",
    userId: "5d67d401c857dc2e0082d87d"
  };
  test("when addding a blog, the blog count increases", async () => {
    await api.post("/api/blogs").send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(initialBlogs.length + 1);
  });
  test("when addding a blog, the title matches", async () => {
    await api.post("/api/blogs").send(newBlog);

    const response = await api.get("/api/blogs");
    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain(newBlog.title);
  });
  test("if the likes property is missing, it defaults to 0", async () => {
    await api.post("/api/blogs").send(newBlogWithNoLikes);
    const response = await api.get("/api/blogs");

    const blogToCheck = response.body.find(
      blog => blog.title === "Angular University"
    );

    expect(blogToCheck.likes).toBeDefined();
    expect(blogToCheck.likes).toBe(0);
  });
  test("if there is no title, it respond with code 400: Bad Request", async () => {
    await api
      .post("/api/blogs")
      .send(newBlogWithNoTitle)
      .expect(400);
  });
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const responseBefore = await api.get("/api/blogs");
    const blogToDelete = responseBefore.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const responseAfter = await api.get("/api/blogs");
    expect(responseAfter.body.length).toBe(initialBlogs.length - 1);
    const titles = responseAfter.body.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update likes of a note", () => {
  test("succeeds with status code 201 if id is valid", async () => {
    const responseBefore = await api.get("/api/blogs");
    const blogToUpdate = responseBefore.body[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 20 })
      .expect(201);

    const responseAfter = await api.get("/api/blogs");
    expect(responseAfter.body[0].likes).toBe(20);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
