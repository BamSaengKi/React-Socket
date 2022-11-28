import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";
import { useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5034"));
  }, []);

  useEffect(() => {
    if(!user){
      return
    }
    socket?.emit("newUser", user);
    console.log(user)
  }, [socket, user]);
  

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket = {socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket = {socket} user = {user}/>
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Lama App</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
