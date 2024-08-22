import React, { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";
import { ThreeDots } from "react-loader-spinner";
import { nanoid } from "nanoid";

export default function Quiz({ toggleStart, categoryId }) {
  const [quizData, setQuizData] = useState([]);
  const [iSloading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [displayResults, setDisplayResults] = useState(false);
  const [warning, setWarning] = useState("");

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

  const calculateScore = () => {
    quizData.forEach((quiz) => {
      quiz.selectedAnswer === quiz.correctAnswer
        ? setScore((prev) => prev + 1)
        : "";
    });
  };

  const checkAnswers = () => {
    const allSelected = quizData.every((quiz) => quiz.selectedAnswer !== "");
    if (allSelected) {
      calculateScore();
      setDisplayResults(true);
      setWarning("");
    } else {
      setDisplayResults(false);
      setWarning("Please select an answer for each question");
      return;
    }
    console.log("check  answers called");
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
            correctAnswer: correct_answer,
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
        <div>
          {quizDisplayElements}
          <p className="text-center mt-2 text-red-500">{warning}</p>
          <div className="mt-6 flex justify-center items-center gap-5">
            {displayResults && (
              <div className="flex justify-center items-center gap-5">
                <p>You scored {score}/5 correct answers</p>
                <button
                  onClick={toggleStart}
                  className="border none rounded-lg w-36  p-2 bg-btn text-white "
                >
                  Play again
                </button>
              </div>
            )}
            {!displayResults && (
              <button
                onClick={checkAnswers}
                className="border none rounded-lg w-36  p-2 bg-btn text-white "
              >
                Check answers
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
