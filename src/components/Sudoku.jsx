"use client";
import React, { useState, useEffect } from "react";
import sudoku from "sudoku";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [userGrid, setUserGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const newPuzzle = sudoku.makepuzzle();
    setPuzzle(newPuzzle);
    setSolution(sudoku.solvepuzzle(newPuzzle));
    setUserGrid(newPuzzle.map((cell) => (cell === null ? " " : cell)));
  }, []);

  const handleChange = (e, index) => {
    const newUserGrid = [...userGrid];
    newUserGrid[index] =
      e.target.value === "" ? "" : parseInt(e.target.value, 10);
    setUserGrid(newUserGrid);

    if (isGameComplete(newUserGrid)) {
      setIsCompleted(true);
      calculateScore(newUserGrid);
    }
  };

  const isGameComplete = (userGrid) => {
    return userGrid.every((value) => value !== "");
  };

  const calculateScore = (userGrid) => {
    const correctAnswers = userGrid.filter(
      (value, idx) => value === solution[idx]
    ).length;
    setScore(correctAnswers);
  };

  const handleSaveScore = async () => {
    try {
      //   await firestore.collection("sudokuScores").add({
      //     score,
      //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   });
      alert("Score saved successfully!");
    } catch (error) {
      console.error("Error saving score: ", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-koulen text-4xl text-grey mb-10">Sudoku</h1>
      <div
        className="mx-auto w-fit"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 30px)",
          gap: "5px",
        }}
      >
        {userGrid.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
            maxLength="1"
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              backgroundColor:
                value === solution[index] ? "lightgreen" : "lightcoral",
            }}
            disabled={isCompleted}
          />
        ))}
      </div>
      {isCompleted && (
        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-xl font-medium">
            Congratulations! Your score is: {score}
          </p>
          <button
            className="bg-kaavi text-white px-4 py-2 rounded-md mt-4"
            onClick={handleSaveScore}
          >
            Save Score
          </button>
        </div>
      )}
    </div>
  );
};

export default Sudoku;
