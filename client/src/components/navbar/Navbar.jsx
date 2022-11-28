import "./Navbar.css";
import Notification from "../../img/notification.jsx";
// import Notification from "../../img/notification.svg"
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect } from "react";
import { useState } from "react";
import {v4} from "uuid"

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      console.log(data)
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else if (type === 3) {
      action = "shared";
    }
    return (
      <span className="notification" key={v4()}>
        {`${senderName} ${action} your post.`}
      </span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          {/* <img src={Notification} className="iconImg" alt="noti" /> */}
          <span className="material-symbols-outlined">notifications</span>
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="메세지" />
          <div className="counter"></div>
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="세팅" />
          <div className="counter"></div>
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
