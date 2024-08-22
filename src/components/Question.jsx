import React from "react";
import he from "he";
export default function Question({ quiz, handleSelectedAnswer, checkAnswers }) {
  // console.log(selectedAnswer);
  const { question, allAnswers, correct_answer, id, selectedAnswer } = quiz;

  const answerElements = allAnswers.map((answer, index) => {
    return (
      <p
        className={`border border-myborder text-myborder rounded-lg py-1 px-4 text-base  font-bold cursor-pointer 
        ${selectedAnswer === he.decode(answer) ? "bg-mybg border-none" : ""}`}
        key={index}
        onClick={() => {
          handleSelectedAnswer(he.decode(answer), id);
        }}
      >
        {he.decode(answer)}
      </p>
    );
  });
  return (
    <div className="flex flex-col items-start border-b">
      <div className="mb-3 pt-3">
        <p className="text-myborder font-bold text-lg ">{question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3 pb-2 sm:flex ">
        {answerElements}
      </div>
    </div>
  );
}
