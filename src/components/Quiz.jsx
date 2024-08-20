import React, { useEffect } from "react";

export default function Quiz({ toggleStart, categoryId }) {
  // console.log(categoryId);
  if (categoryId === " ") {
    console.log("any category was selected");
  }

  useEffect(() => {
    let fetchUrl =
      categoryId === " "
        ? `https://opentdb.com/api.php?amount=5`
        : `https://opentdb.com/api.php?amount=5&category=${categoryId}`;
    console.log(fetchUrl);
    fetch(`${fetchUrl}`)
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.status);
          console.log("response not okay", res);
          throw "Something went wrong";
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err, "there was an error");
      });
  }, []);
  return (
    <div className="flex">
      <button onClick={toggleStart} className="border bg-btn text-white">
        Play again
      </button>
      Quiz Display page
    </div>
  );
}
