"use client";
import { Quiz } from "@/types/quiz";
import { Eye } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface SolveQuizProps {
  quizData: Quiz;
}

export const SolveQuiz = ({ quizData }: SolveQuizProps) => {
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>(
    {},
  );

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [index, setIndex] = useState(0);
  const isLastQuestion = index === quizData.questions.length - 1;
  const allQuestionsSolved = quizData.questions.every(
    (_q, i) => visibleAnswers[i],
  );

  const restartQuiz = () => {
    setIndex(0);
    setVisibleAnswers({});
  };

  return (
    <>
      {!allQuestionsSolved ? (
        <>
          <div className="text-center mb-6">
            <p className="font-bold text-xl text-gray-800">
              Question {index + 1} / {quizData.questions.length}
            </p>

            <div className="flex justify-center flex-wrap gap-2 mt-2">
              {quizData.questions.map((q, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 flex justify-center items-center text-xs font-medium cursor-pointer rounded 
                    ${index === i ? "bg-blue-600 text-white" : ""}
                    ${visibleAnswers[i] && index !== i ? "bg-green-500 text-white" : ""}
                    ${!visibleAnswers[i] && index !== i ? "bg-gray-200 text-gray-800" : ""}
                    hover:bg-gray-300 transition `}
                  onClick={() => setIndex(i)}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="my-6 p-4 border-2 rounded bg-gray-50 shadow">
            <p className="md:text-xl mb-4 font-medium text-gray-800">
              {quizData.questions[index].question}
            </p>

            <div className="relative p-2 md:p-4 border rounded bg-white">
              <p className="md:text-lg font-bold text-gray-900">
                {quizData.questions[index].answer}
              </p>

              <div
                className={`absolute inset-0 z-10 bg-gray-100 rounded flex justify-center items-center cursor-pointer transition
                    ${visibleAnswers[index] ? "hidden" : "flex"}`}
                onClick={() => toggleAnswer(index)}
              >
                <span className="mr-2 text-gray-700 font-medium">
                  Show Answer
                </span>
                <Eye className="text-gray-700" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              text="Previous"
              color="bg-gray-400 hover:bg-gray-500"
              className={index == 0 ? "opacity-50 cursor-not-allowed!" : ""}
            />

            <Button
              disabled={isLastQuestion}
              onClick={() =>
                setIndex((i) => Math.min(quizData.questions.length - 1, i + 1))
              }
              text="Next"
              color="bg-blue-600 hover:bg-blue-700"
              className={isLastQuestion ? "opacity-50 cursor-not-allowed!" : ""}
            />
          </div>
        </>
      ) : (
        <div className="text-center mt-8 space-y-4">
          <p className="text-green-600 font-bold text-xl">Quiz Completed!</p>
          <p className="text-gray-700">You’ve reached the end of the quiz.</p>

          <Button
            text="Restart Quiz"
            onClick={restartQuiz}
            color="bg-green-600 hover:bg-green-700 mx-auto"
          />

          <Link
            href="/"
            className="text-blue-600 underline block mt-2 hover:text-blue-700 transition"
          >
            Back to Quizzes
          </Link>
        </div>
      )}
    </>
  );
};
