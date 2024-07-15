import React, { useState } from "react";

export const Input = ({ addTask }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if(!inputText) return 
    addTask(inputText);
    setInputText("");
  }

  return (
    <div className="container">
      <input
        type="text"
        className="input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="button" onClick={handleSubmit}>Add</button>
    </div>
  );
};
