"use client";
import { createQuiz, updateQuiz } from "@/actions/actions";
import { Question, Quiz } from "@/types/quiz";
import { Plus, Trash2 } from "lucide-react";
import { useActionState, useEffect, useEffectEvent, useState } from "react";
import { InputSelect } from "../ui/input-select";
import { Button } from "../ui/button";

interface quizProps {
  quizData?: Quiz;
  questionsData?: Question[];
}

export const CreateQuiz = ({ quizData, questionsData }: quizProps) => {
  const isEdit = Boolean(quizData);

  const emptyQuiz: Quiz = { id: 0, name: "", questions: [] };

  const [quiz, setQuiz] = useState<Quiz>(quizData ?? emptyQuiz);
  const [questions, setQuestions] = useState<Question[]>(quiz.questions);
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateQuiz : createQuiz,
    null,
  );

  const handleChangeName = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleChangeQuestion = (
    id: number,
    field: keyof Question,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              [field]: value,
            }
          : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + (questionsData?.length ?? 0),
        question: "",
        answer: "",
      },
    ]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const onSumbit = useEffectEvent((status: string | undefined) => {
    if (status === "success" && !isEdit) {
      setQuiz(emptyQuiz);
      setQuestions([]);
    }
  });

  useEffect(() => {
    onSumbit(state?.status);
  }, [state]);

  return (
    <>
      <form action={formAction} className="space-y-6">
        <div className={`${isEdit && "grid lg:grid-cols-2 gap-4"}`}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Quiz Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={quiz?.name}
              onChange={(e) => handleChangeName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-4 ${isEdit && "lg:grid-cols-2"}`}>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded border border-gray-200 p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Question {index + 1}
                </h3>

                <Trash2
                  size={18}
                  className="text-red-500 hover:text-red-700 cursor-pointer transition"
                  onClick={() => handleDeleteQuestion(question.id)}
                />
              </div>

              <div className="mb-4">
                <InputSelect
                  required
                  value={question.question}
                  options={
                    questionsData
                      ?.filter(
                        (q) =>
                          !questions.some(
                            (added) => added.question === q.question,
                          ),
                      )
                      .map((q) => q.question) || []
                  }
                  onInputChange={(value) => {
                    handleChangeQuestion(question.id, "question", value);
                  }}
                  onOptionSelect={(value) => {
                    const selectedQuestion = questionsData?.find(
                      (q) => q.question === value,
                    );
                    handleChangeQuestion(
                      question.id,
                      "answer",
                      selectedQuestion?.answer || "",
                    );
                  }}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Answer
                </label>
                <input
                  required
                  type="text"
                  value={question.answer}
                  onChange={(e) =>
                    handleChangeQuestion(question.id, "answer", e.target.value)
                  }
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          ))}
        </div>

        <input
          type="hidden"
          name="questions"
          value={JSON.stringify(questions)}
        />

        <input
          type="hidden"
          name="existingQuestions"
          value={JSON.stringify(questionsData)}
        />

        {isEdit && <input type="hidden" name="quizId" value={quiz.id} />}

        <div className={`space-y-3 ${isEdit && "lg:max-w-lg lg:mx-auto"}`}>
          <Button
            text="Add Question"
            icon={<Plus size={18} />}
            type="button"
            className="w-full text-sm"
            color="bg-green-600 hover:bg-green-700"
            onClick={handleAddQuestion}
          />

          <Button
            text={isEdit ? "Update Quiz" : "Create Quiz"}
            type="submit"
            disabled={isPending}
            className={`w-full text-sm ${isPending ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          />
        </div>
      </form>

      {state && (
        <div
          className={`my-6 px-4 py-2 rounded text-sm font-medium ${
            state.status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {state.message}
        </div>
      )}
    </>
  );
};
