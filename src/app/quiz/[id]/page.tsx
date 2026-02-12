import { CreateQuiz } from "@/app/components/forms/quiz-form";
import { Header } from "@/app/components/layout/header";

export default async function Quiz({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quizRes, questionsRes] = await Promise.all([
    fetch(`${process.env.API_URL}/quizzes/${id}`),
    fetch(`${process.env.API_URL}/questions`),
  ]);

  if (!quizRes.ok) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Quiz not found</span>
      </div>
    );
  }

  const quiz = await quizRes.json();
  const questions = await questionsRes.json();

  return (
    <>
      <Header
        modalButtonLinkText="Start quiz"
        linkPath={`/quiz/${id}/solve`}
        modalButtonText="LInk"
      />

      <div className="container">
        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded shadow-sm">
          <div>
            <h2 className="text-xl font-bold mb-2">Quiz: {quiz?.name}</h2>
            <p className="text-sm text-gray-500">
              Number of Questions: {quiz.questions?.length || 0}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <CreateQuiz quizData={quiz} questionsData={questions} />
      </div>
    </>
  );
}
