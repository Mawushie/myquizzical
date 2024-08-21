import React from "react";
import he from "he";
export default function Question({ quiz, getSelectedAnswer }) {
  const { question, allAnswers, correct_answer } = quiz;
  // console.log(quiz);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  let randomizedAnswers = shuffleArray(allAnswers);
  const answerElements = randomizedAnswers.map((answer, index) => {
    return (
      <p
        className="border border-myborder text-myborder rounded-lg py-1 px-4 text-base font-bold cursor-pointer"
        key={index}
        onClick={() => getSelectedAnswer(he.decode(answer), correct_answer)}
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
