const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const getMostLikedBlog = blogs => {
  return blogs
    .map(blog => {
      return { title: blog.title, author: blog.author, likes: blog.likes };
    })
    .reduce((mostLiked, blog) => {
      if (blog.likes > mostLiked.likes) {
        return blog;
      } else return mostLiked;
    });
};

module.exports = {
  totalLikes,
  getMostLikedBlog
};
