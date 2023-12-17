import React from "react";
import { useContext } from "react";

const Testing = ({ anothProp, FunctionContext }) => {
  console.log(anothProp);

  const { maxLength } = useContext(FunctionContext);
  console.log(maxLength);

  return (
    <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
      <button className="">TESTING</button>
    </div>
  );
};

export default Testing;
