import React from "react";

export default function Quiz({ toggleStart, categoryId }) {
  console.log(categoryId);
  if (categoryId === " ") {
    console.log("any category was selected");
  }
  return (
    <div>
      <button onClick={toggleStart} className="border bg-btn text-white">
        Play again
      </button>
      Quiz Display page
    </div>
  );
}
