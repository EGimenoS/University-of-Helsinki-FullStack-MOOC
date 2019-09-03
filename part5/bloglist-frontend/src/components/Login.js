import React from "react";

const Login = ({ handlePassword, handleUserName, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input onChange={handleUserName} type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input onChange={handlePassword} type="text" id="password" />
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default Login;
