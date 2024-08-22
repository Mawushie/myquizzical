import React from "react";
import he from "he";
export default function Question({
  quiz,
  handleSelectedAnswer,
  displayResults,
}) {
  // console.log(selectedAnswer);
  const { question, allAnswers, correctAnswer, id, selectedAnswer } = quiz;

  const answerElements = allAnswers.map((answer, index) => {
    let decodedAnswer = he.decode(answer);

    let answerStyles;
    //answer === selected && answer === correctAnswer
    //then background is green
    //if answer === selected and answer !==correctAnswer
    //then background is pink
    //if answer === correctAnswer
    //then background is green
    if (displayResults) {
      if (
        decodedAnswer === selectedAnswer &&
        decodedAnswer === he.decode(correctAnswer)
      ) {
        answerStyles = "green";
      }
      if (
        decodedAnswer === selectedAnswer &&
        decodedAnswer !== he.decode(correctAnswer)
      ) {
        answerStyles = "red";
      }
      if (decodedAnswer === he.decode(correctAnswer)) {
        answerStyles = "green";
      }
    }
    return (
      <p
        className={`border border-myborder text-myborder rounded-lg py-1 px-4 text-base  font-bold cursor-pointer 
        ${selectedAnswer === decodedAnswer ? "bg-mybg border-none" : ""}
        ${answerStyles}
        `}
        key={index}
        onClick={() => {
          handleSelectedAnswer(decodedAnswer, id);
        }}
      >
        {decodedAnswer}
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
