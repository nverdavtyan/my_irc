import React, { Fragment } from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";

const Message = ({ message: { text, user } }) => {
  return (
    <Fragment>
      <div className="messageContainer justifyStart">
        <p className="sentText">{user}</p>
        <div className="messageBox">
          <p className="messageText">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
