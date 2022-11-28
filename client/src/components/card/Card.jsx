import "./Card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
    console.log(type)
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="유저이미지" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="게시물이미지" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="좋아요" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt="좋아요취소"
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt="댓글"
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt="공유"
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="정보" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
