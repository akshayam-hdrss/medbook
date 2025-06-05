"use client";
import Link from "next/link";
import React, { useState } from "react";

const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
    }
  };
  return (
    <div className="p-5">
      {/* <div className="p-6">
      <h1 className="font-koulen text-4xl text-grey mb-10">Quiz</h1>
      <section className='grid gap-5'>
        <div className="">
            <h1>What is HDRSS</h1>
            <div className="">
            <input type="radio" name="question1" id="question1a" value="A" />
            <label htmlFor="question1a">A</label>
            </div>
            <div className="">
            <input type="radio" name="question1" id="question1b" value="B" />
            <label htmlFor="question1b">B</label>
            </div>
            <div className="">
            <input type="radio" name="question1" id="question1c" value="C" />
            <label htmlFor="question1c">C</label>
            </div>
           <div className="">
           <input type="radio" name="question1" id="question1d" value="D" />
           <label htmlFor="question1d">D</label>
           </div>
            
        </div>
      </section>
      </div> */}
      <div className="">
        <h1 className="font-koulen text-4xl text-grey mb-10">Quiz</h1>
      </div>
      <div className="">
        <div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <h2>{questions[currentQuestion].question}</h2>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="pt-2 ">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      required
                    />
                    {option}
                  </label>
                </div>
              ))}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-kaavi text-white px-3 py-1 rounded-md"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center ">
              <div className="">
                <div className="text-center ">
                  <h2 className="text-2xl font-semibold">Quiz Completed</h2>
                  <p>
                    Your score is: {score} out of {questions.length}
                  </p>
                </div>
                <div className="flex justify-center pt-5">
                    <Link href={"/games"} className="bg-kaavi text-white px-3 py-1 rounded-md">Back to Games</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
