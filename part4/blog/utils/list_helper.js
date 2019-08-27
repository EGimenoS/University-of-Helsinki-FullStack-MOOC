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

const mostBlogs = blogs => {
  const authors = [];
  blogs.forEach(blog => {
    const author = authors.find(author => {
      return author.author === blog.author;
    });
    if (author) {
      author.blogs++;
    } else {
      authors.push({ author: blog.author, blogs: 1 });
    }
  });
  return authors.reduce((most, author) => {
    if (author.blogs > most.blogs) {
      return author;
    } else return most;
  });
};

const mostLikes = blogs => {
  const authors = [];
  blogs.forEach(blog => {
    const author = authors.find(author => {
      return author.author === blog.author;
    });
    if (author) {
      author.likes = author.likes + blog.likes;
    } else {
      authors.push({ author: blog.author, likes: blog.likes});
    }
  });
  return authors.reduce((most, author) => {
    if (author.likes > most.likes) {
      return author;
    } else return most;
  });
};

module.exports = {
  totalLikes,
  getMostLikedBlog,
  mostBlogs,
  mostLikes
};
