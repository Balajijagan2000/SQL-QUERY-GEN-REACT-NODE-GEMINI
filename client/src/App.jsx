import Chat from "./components/Chat";
import "./App.css";
import ChatResponse from "./components/ChatResponse";
import ChatHistory from "./components/ChatHistory";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="container">
      <ChatHistory />
      <Chat />
      <ChatResponse />
    </div>
  );
}

export default App;
