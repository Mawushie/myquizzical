import React, { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";
import { ThreeDots } from "react-loader-spinner";
import { nanoid } from "nanoid";

export default function Quiz({ toggleStart, categoryId }) {
  const [quizData, setQuizData] = useState([]);
  const [iSloading, setIsLoading] = useState(false);

  // if (categoryId === " ") {
  //   console.log("any category was selected");
  // }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSelectedAnswer = (selectedAnswer, id) => {
    console.log(selectedAnswer);
    console.log(id);
    setQuizData((prev) =>
      prev.map((quiz) => {
        if (quiz.id === id) {
          return {
            ...quiz,
            selectedAnswer: selectedAnswer,
          };
        } else {
          return quiz;
        }
      })
    );
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
        // console.log(data.results);
        let quizArray = data.results.map((quiz) => {
          const { question, incorrect_answers, correct_answer } = quiz;
          let answers = [...incorrect_answers, correct_answer];
          let shuffledAnswers = shuffleArray(answers);
          return {
            question: he.decode(question),
            allAnswers: shuffledAnswers,
            correct_answer: correct_answer,
            selectedAnswer: "",
            id: nanoid(),
          };
        });
        setQuizData(quizArray);
        setIsLoading(false);
        // console.log(quizArray);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const quizDisplayElements = quizData.map((quiz) => {
    return (
      <Question
        quiz={quiz}
        key={quiz.id}
        handleSelectedAnswer={handleSelectedAnswer}
      />
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
