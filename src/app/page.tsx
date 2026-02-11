import { Quiz } from "@/types/quiz";
import { Table } from "./components/ui/table";
import { Header } from "./components/layout/header";
import { CreateQuiz } from "./components/forms/quiz-form";

export default async function Home() {
  const [quizzesRes, questionsRes] = await Promise.all([
    fetch(`${process.env.API_URL}/quizzes`),
    fetch(`${process.env.API_URL}/questions`),
  ]);

  const quizzes = await quizzesRes.json();
  const questions = await questionsRes.json();

  return (
    <>
      <Header
        modalButtonText="Create Quiz"
        modalContent={<CreateQuiz questionsData={questions} />}
      />

      <Table<Quiz>
        data={quizzes}
        rowClassName="hover:bg-gray-100 cursor-pointer"
        columns={[
          {
            header: "ID",
            accessor: "id",
            colClassName: "w-1/12",
          },
          {
            header: "Quiz Name",
            accessor: "name",
            colClassName: "w-1/1",
          },
          {
            header: "Actions",
            colClassName: "text-right",
          },
        ]}
      ></Table>
    </>
  );
}
