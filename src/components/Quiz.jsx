import React, { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";

export default function Quiz({ toggleStart, categoryId }) {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  // console.log(categoryId);
  // if (categoryId === " ") {
  //   console.log("any category was selected");
  // }

  const getSelectedAnswer = (selectedAnswer, correctAnswer) => {
    console.log(selectedAnswer);
    console.log(correctAnswer);
  };

  useEffect(() => {
    let fetchUrl =
      categoryId === " "
        ? `https://opentdb.com/api.php?amount=5`
        : `https://opentdb.com/api.php?amount=5&category=${categoryId}`;
    // console.log(fetchUrl);
    fetch(`${fetchUrl}`)
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.status);
          console.log(res);
          throw "Something went wrong";
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.results);
        let quizArray = data.results.map((quiz) => {
          const { question, incorrect_answers, correct_answer } = quiz;
          return {
            question: he.decode(question),
            allAnswers: [...incorrect_answers, correct_answer],
            correct_answer: correct_answer,
          };
        });
        setQuizData(quizArray);
        console.log(quizArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const quizDisplayElements = quizData.map((quiz, index) => {
    return (
      <Question quiz={quiz} key={index} getSelectedAnswer={getSelectedAnswer} />
    );
  });
  return (
    <div className="flex flex-col">
      {quizDisplayElements}
      <button onClick={toggleStart} className="border bg-btn text-white">
        Play again
      </button>
    </div>
  );
}
