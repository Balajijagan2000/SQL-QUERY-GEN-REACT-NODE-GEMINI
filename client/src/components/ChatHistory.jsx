import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContect";
import History from "./History";
const ChatHistory = () => {
  const { chat_history } = useContext(AppContext);

  return (
    <div className="chat-history-box">
      {chat_history.map((history) => {
        return <History key={history.id} text={history.text} id={history.id} />;
      })}
    </div>
  );
};

export default ChatHistory;
