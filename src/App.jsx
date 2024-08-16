import { useState } from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  //state to render start page or quiz page
  const [startQuiz, setStartQuiz] = useState(false);
  //state to track the category id selected
  const [categoryId, setCategoryId] = useState("");
  const toggleStart = () => {
    setStartQuiz((prev) => !prev);
  };

  const getCategoryId = (id) => {
    // console.log("handle change  in App called");
    // console.log(id);
    setCategoryId(id);
  };
  //if startQuiz state is false, then display the Start page
  //if true, then display the Quiz page
  //Start component takes a getCategoryId prop which will be passed down to the start CategorySelect Component
  return (
    <main className="p-3">
      {startQuiz ? (
        <Quiz toggleStart={toggleStart} categoryId={categoryId} />
      ) : (
        <Start
          toggleStart={toggleStart}
          getCategoryId={getCategoryId}
          categoryId={categoryId}
        />
      )}
    </main>
  );
}

export default App;
