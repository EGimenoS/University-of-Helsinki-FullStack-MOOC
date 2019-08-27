const listHelper = require("../utils/list_helper");
const blogs = require("../utils/bloglist_test").blogs;

describe("total likes", () => {
  const listWithOneBlog = blogs.slice(0, 1);
  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7);
  });

  test("it equals to the sum of likes in the blog list", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("blog with the most likes", () => {
  const mostLikedBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  };
  test("it returns the blog with the most likes", () => {
    expect(listHelper.getMostLikedBlog(blogs)).toEqual(mostLikedBlog);
  });
});
