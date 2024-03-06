import logo from "./logo.svg";
import "./App.css";

import Login from "./Components/Authentication/Login";
import Home from "./Components/Home";
import Allquestions from "./Components/Questions/Allquestions";
import Index from "./StackRoutes/Index";

function App() {
  return (
    <div className="App">
      <Index />
    </div>
  );
}

export default App;
