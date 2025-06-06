"use client";

import { createCourse } from "@/lib/actions/courses";
import { State } from "@/lib/models/types";
import Link from "next/link";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);
  return (
    <form action={formAction}>
      <div className="flex flex-col rounded-md bg-bej-50 px-4 py-5 gap-3 text-charade-950 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
        {/* Course Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-jost font-medium text-[16px]">
            Chooshe course name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Course name"
            aria-describedby="name-error"
            className="px-2 py-2 text-[14px] font-inter rounded-[2px] bg-spring-white
            outline-1 outline-tuatara-400 placeholder:text-tuatara-400 "
          ></input>
          {state.errors?.name && state.errors?.name.length > 0 && (
            <div>
              {state.errors.name.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        {/* Course Grades */}
        <div className="flex flex-col gap-1">
          <legend className="font-jost font-medium text-[16px]">
            Chooshe course grades
          </legend>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <label htmlFor="min_grade" className="font-inter text-[14px]">
                Min Grade
              </label>
              <input
                id="min_grade"
                name="min_grade"
                type="number"
                min={1}
                max={12}
                placeholder="0"
                aria-describedby="min_grade-error"
                className=" py-[2px] px-2 text-[14px] font-inter rounded-[2px] bg-spring-white
            outline-1 outline-tuatara-400 placeholder:text-tuatara-400 w-[30px] "
              ></input>
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="max_grade" className="font-inter text-[14px]">
                Max Grade
              </label>
              <input
                id="max_grade"
                name="max_grade"
                type="number"
                min={1}
                max={12}
                placeholder="0"
                aria-describedby="min_grade-error"
                className=" py-[2px] px-2 text-[14px] font-inter rounded-[2px] bg-spring-white
            outline-1 outline-tuatara-400 placeholder:text-tuatara-400 w-[30px]"
              ></input>
            </div>
          </div>
          {state.errors?.grades && state.errors?.grades.length > 0 && (
            <div>
              {state.errors.grades.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        {/* Course visibility */}
        <fieldset
          className="flex flex-col "
          aria-describedby="visibility-error"
        >
          <legend className="font-jost font-medium text-[16px] ">
            Chooshe course visibility
          </legend>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1">
              <label
                htmlFor="private"
                className="font-inter text-[14px] cursor-pointer"
              >
                Private
              </label>
              <input
                id="private"
                name="visibility"
                type="radio"
                value="PRIVATE"
                className="h-4 w-4 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-1">
              <label
                htmlFor="public"
                className="font-inter text-[14px] cursor-pointer"
              >
                Public
              </label>
              <input
                id="public"
                name="visibility"
                type="radio"
                value="PUBLIC"
                className="h-4 w-4 cursor-pointer"
              />
            </div>
          </div>
          {state.errors?.visibility && state.errors?.visibility.length > 0 && (
            <div>
              {state.errors.visibility.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </fieldset>

        {/* Course subject */}
        <fieldset className="flex flex-col " aria-describedby="subject-error">
          <legend className="font-jost font-medium text-[16px] ">
            Chooshe course subject
          </legend>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1">
              <label
                htmlFor="geometry"
                className="font-inter text-[14px] cursor-pointer"
              >
                Geometry
              </label>
              <input
                id="geometry"
                name="subject"
                type="radio"
                value="GEOMETRY"
                className="h-4 w-4 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-1">
              <label
                htmlFor="algebra"
                className="font-inter text-[14px] cursor-pointer"
              >
                Algebra
              </label>
              <input
                id="algebra"
                name="subject"
                type="radio"
                value="ALGEBRA"
                className="h-4 w-4 cursor-pointer"
              />
            </div>
          </div>
          {state.errors?.subject && state.errors?.subject.length > 0 && (
            <div>
              {state.errors.subject.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </fieldset>

        {/* Course Color */}
        <div className="flex flex-col gap-1 w-fit">
          <label htmlFor="color" className="font-jost font-medium text-[16px]">
            Chooshe course color
          </label>
          <input
            id="color"
            name="color"
            type="color"
            defaultValue="#FF6868"
            aria-describedby="color-error"
            className="cursor-pointer w-full h-[36px]"
          ></input>
          {state.errors?.color && state.errors?.color.length > 0 && (
            <div>
              {state.errors.color.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <Link
          className="px-3 py-[6px] bg-border rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
          href="/teacher/courses"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-3 py-[6px] bg-carnation-400 cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
        >
          Create Course
        </button>
      </div>
    </form>
  );
}
