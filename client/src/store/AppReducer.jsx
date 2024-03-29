import { v4 as uuidv4 } from "uuid";

const AppReducer = (state, action) => {
  const TYPE = action.type;
  switch (TYPE) {
    case "CLEAR_CHAT_HISTORY": {
      return { ...state, chat_history: [] };
    }
    case "CLEAR_RESPONSE": {
      return { ...state, chat_response: "" };
    }
    case "REMOVE_SINGLE_HISTORY": {
      const newHistory = state.chat_history.filter((history) => {
        return history.id != action.payload.id;
      });
      return { ...state, chat_history: [...newHistory] };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "ADD_RESPONSE": {
      return { ...state, chat_response: action.payload };
    }
    case "ADD_HISTORY": {
      const newHistory = [
        { id: uuidv4(), text: action.payload },
        ...state.chat_history,
      ];
      return { ...state, chat_history: [...newHistory] };
    }

    default:
      return { ...state };
  }
};
export default AppReducer;
