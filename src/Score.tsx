import React, { useState, useEffect } from "react";
import "./App.css";

interface scoreProps {
    score: number;
}
function Score(props:scoreProps) {
  const {score} = props;
  return (
    <div>
      Your score is {score}
    </div>
  );
  }

export default Score;