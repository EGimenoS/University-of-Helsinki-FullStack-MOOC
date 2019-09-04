import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import React, { useState, useEffect } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogTitle, setBlogTitle] = useState(null);
  const [blogAuthor, setBlogAuthor] = useState(null);
  const [blogUrl, setBlogUrl] = useState(null);

  useEffect(() => {
    const userStored = window.localStorage.getItem("user");
    if (userStored) {
      const user = JSON.parse(userStored);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogsService.getAll().then(initialBlogs => {
      console.log(initialBlogs);
      setBlogs(initialBlogs);
    });
  }, []);

  const handleBlogForm = async event => {
    event.preventDefault();

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    };
    try {
      const createdBlog = await blogsService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNotificationMessage("BlogCreated");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage("Error creating");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleTitle = event => {
    setBlogTitle(event.target.value);
  };

  const handleAuthor = event => {
    setBlogAuthor(event.target.value);
  };

  const handleUrl = event => {
    setBlogUrl(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleUserName = event => {
    setUsername(event.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      blogsService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Wrong credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    blogsService.setToken(null);
  };

  const renderLogin = () => {
    return (
      <Login
        handlePassword={handlePassword}
        handleUserName={handleUserName}
        handleLogin={handleLogin}
      />
    );
  };

  const renderBlogs = () => {
    return (
      <>
        <h1>Blog List</h1>
        <h3>User {user.username} is logged in </h3>
        <BlogForm
          handleBlogForm={handleBlogForm}
          handleTitle={handleTitle}
          handleAuthor={handleAuthor}
          handleUrl={handleUrl}
        />
        <button onClick={handleLogout}>Log Out</button>
        <Blogs blogs={blogs} />
      </>
    );
  };

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? renderLogin() : renderBlogs()}
    </div>
  );
};

export default App;
