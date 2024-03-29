import React, { useContext, useState } from "react";
import { AppContext } from "../store/AppContect";
import { IoSend } from "react-icons/io5";
const Chat = () => {
  const [text, setText] = useState("");
  const { dispatch } = useContext(AppContext);

  const handleClick = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const response = await fetch("http://localhost:5000/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "ADD_RESPONSE",
          payload: data.data,
        });

        dispatch({
          type: "ADD_HISTORY",
          payload: text,
        });
      } else {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "ADD_RESPONSE",
          payload: "Something went wrong😥. Please try again.",
        });
      }
    } catch (err) {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      alert("Please enter prompts only to generate SQL queries!");
    }
  };
  return (
    <div className="chat-box">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I will give solutions for your SQL problems..."
      ></textarea>
      <div>
        <button onClick={handleClick}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
