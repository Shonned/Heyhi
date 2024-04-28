import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";

function App() {
  return <>
      <div className="app">
          <Sidebar />
          <History />
          <ChatBot />
      </div>
  </>
}

export default App
