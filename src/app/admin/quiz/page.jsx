"use client";
import React from "react";
import { useState } from "react";

function quizPage() {
  const [open, setOpen] = useState();
  const [n, setN] = useState(3);
  const [questions, setQuestions] = useState({});
  const handleAdd = () => {
    setOpen(!open);
  };
  return (
    <div>
      {/* <button onClick={handleAdd}>Add a Question</button>
      <div className={open ? " " : "hidden"}>
        <p>Enter the question</p>
        <input type="text" />
        <p>Enter the options</p>
        {Array.from({ length: n }).map((_, index) => (
          <input key={index} type="text" className="border border-kaavi" />
        ))}
        <button onClick={() => setN(n + 1)}>Add another option</button>
        <button onClick={()=> setQuestions({question: })}>Submit the Question</button>
      </div> */}
    </div>
  );
}

export default quizPage;
