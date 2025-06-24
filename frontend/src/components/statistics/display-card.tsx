import React from "react";

export default function DisplayCard({
  name,
  display,
}: {
  name: string;
  display: string;
}) {
  return (
    <div className="flex flex-col  h-fit items-center flex-25 bg-spring-white border-2 border-tuatara-900  px-6 py-7 rounded-[8px] gap-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
      <p className="font-inter text-[32px] font-bold text-tuatara-900">
        {display}
      </p>
      <h1 className="font-inter text-[20px] font-medium text-tuatara-900 text-nowrap">
        {name}
      </h1>
    </div>
  );
}
