import { Header } from "@/app/components/layout/header";
import { SolveQuiz } from "@/app/components/quiz/solve-quiz";

export default async function SolveQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Quiz not found</span>
      </div>
    );
  }

  const quiz = await res.json();

  return (
    <>
      <Header modalButtonLinkText="Edit Quiz" linkPath={`/quiz/${id}`} />
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-6">{quiz?.name}</h2>
        <SolveQuiz quizData={quiz} />
      </div>
    </>
  );
}
