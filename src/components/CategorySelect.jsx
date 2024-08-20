import React, { useState } from "react";
import categories from "../categories";

//Selectbox for categories
export default function CategorySelect({ getCategoryId }) {
  //receives props and passes the category id to the function, which will now be passed  back to <Start/> and then to app
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryOptions = categories.map((category) => {
    return (
      <option value={category.category_id} key={category.category_id}>
        {category.category}
      </option>
    );
  });
  const handleChange = (e) => {
    // console.log(e.target.value);
    setSelectedCategory(e.target.value);
    //passing the categoryId to the props
    getCategoryId(e.target.value);
  };
  return (
    <div className="flex flex-col">
      <label className="karla text-xl sm:text-2xl mb-2 self-center">
        Choose a Category
      </label>
      <select
        value={selectedCategory}
        className="w-full border rounded p-3 border-blue-900 outline-blue-950"
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categoryOptions}
      </select>
    </div>
  );
}
