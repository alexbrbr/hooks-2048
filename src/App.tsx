import React, { useState } from "react";
import "./App.css";
import Score from "./Score";

function App() {
  const [score, setScore] = useState(0);
  return (
    <div>
      <Score score={score}></Score>
    </div>
  );
  }

export default App;