import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContect";
import { FaRegCopy } from "react-icons/fa6";
import Loader from "./Loader";
const ChatResponse = () => {
  const { chat_response, dispatch, loading } = useContext(AppContext);
  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  };
  const handleClear = () => {
    dispatch({
      type: "CLEAR_RESPONSE",
    });
  };
  const handleClick = (e) => {
    copyToClipboard(chat_response)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        alert("Unable to copy!");
      });
  };

  const handleClearHistory = () => {
    dispatch({
      type: "CLEAR_CHAT_HISTORY",
    });
  };
  return (
    <div className="chat-response-box">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="chat-response">{chat_response.toString()}</div>
          <div className="chat-response-btns">
            <button onClick={handleClear}>clear</button>
            <span className={`${isCopied ? "" : "hide"}`}>Copied</span>
            <button onClick={handleClearHistory}>clear history</button>
            <button onClick={handleClick}>
              <FaRegCopy />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatResponse;
