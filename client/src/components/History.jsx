import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { AppContext } from "../store/AppContect";
const History = ({ text, id }) => {
  const { dispatch } = useContext(AppContext);
  const handleDelete = () => {
    dispatch({
      type: "REMOVE_SINGLE_HISTORY",
      payload: { id: id, text: text },
    });
  };
  return (
    <div className="history">
      <div>
        <button onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default History;
