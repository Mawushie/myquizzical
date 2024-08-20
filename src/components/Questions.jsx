import React from "react";

export default function Questions() {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-3">
        <p className="text-myborder font-bold text-lg ">
          How would one say goodbye in spanish?
        </p>
      </div>

      <div className="flex gap-3">
        <p className="border border-myborder text-myborder rounded-lg py-1 px-4 text-base font-bold">
          Adios
        </p>
        <p className="border border-myborder text-myborder rounded-lg py-1 px-4 text-base font-bold">
          Hola
        </p>
        <p className="border border-myborder text-myborder rounded-lg py-1 px-4 text-base font-bold">
          Au Revoir
        </p>
      </div>
    </div>
  );
}
