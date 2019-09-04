import React from 'react'

const BlogForm = ({handleAuthor, handleBlogForm, handleTitle, handleUrl}) => {
  return (
    <>
      <form onSubmit={handleBlogForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input onChange={handleTitle} type="text" id="title" />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input onChange={handleAuthor} type="text" id="author" />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input onChange={handleUrl} type="text" id="url" />
        </div>
        <div>
          <button type="submit">Create Blog</button>
        </div>
      </form>
    </>
  );
}

export default BlogForm