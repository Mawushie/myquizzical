import React, { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";
import { ThreeDots } from "react-loader-spinner";

export default function Quiz({ toggleStart, categoryId }) {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [iSloading, setIsLoading] = useState(false);
  // console.log(categoryId);
  // if (categoryId === " ") {
  //   console.log("any category was selected");
  // }

  const getSelectedAnswer = (selectedAnswer, correctAnswer) => {
    console.log(selectedAnswer);
    console.log(correctAnswer);
  };

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        console.log(quizArray);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const quizDisplayElements = quizData.map((quiz, index) => {
    return (
      <Question quiz={quiz} key={index} getSelectedAnswer={getSelectedAnswer} />
    );
  });
  return (
    <div
      className={`${
        iSloading ? "h-screen flex justify-center items-center" : ""
      }`}
    >
      {iSloading ? (
        <div>
          <ThreeDots color="#4D5B9E" wrapperStyle={{ display: "flex" }} />
        </div>
      ) : (
        <>
          {quizDisplayElements}
          <button onClick={toggleStart} className="border bg-btn text-white">
            Play again
          </button>
        </>
      )}
    </div>
  );
}
