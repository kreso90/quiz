import { Header } from "@/app/components/layout/header";
import { SolveQuiz } from "@/app/components/quiz/solve-quiz";

export default async function SolveQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.API_URL}/quizzes/${id}`);

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
        <SolveQuiz quizData={quiz} />
      </div>
    </>
  );
}
