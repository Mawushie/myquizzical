import React, { useState } from "react";
import CategorySelect from "./CategorySelect";

export default function Start({ toggleStart, getCategoryId, categoryId }) {
  //   if (categoryId === "") {
  //     console.log("nothing selected");
  //   }
  //   if (categoryId === " ") {
  //     console.log("any catergory was selected");
  //   }
  //the CategorySelect will receive the props and then make use of it in itself
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h1 className="shadows-into-light-regular font-bold text-5xl sm:text-7xl">
        Quizzical
      </h1>

      <CategorySelect getCategoryId={getCategoryId} />
      <button
        className={`w-44 h-12 border rounded-2xl bg-btn text-white self-center cursor-pointer`}
        onClick={toggleStart}
        disabled={categoryId === ""}
        aria-label="startQuiz button"
      >
        Start Quiz
      </button>
    </div>
  );
}
