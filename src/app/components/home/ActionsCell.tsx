"use client";

import { useActionState, useEffect, useEffectEvent, useState } from "react";
import { Modal } from "../ui/modal";
import { deleteQuiz } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Quiz } from "@/types/quiz";

interface ActionsCellProps {
  quiz: Quiz;
}

export const ActionsCell = ({ quiz }: ActionsCellProps) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteQuiz, null);
  const router = useRouter();

  const handleSuccess = useEffectEvent(() => {
    setOpen(false);
  });

  useEffect(() => {
    if (state?.status === "success") {
      handleSuccess();
    }
  }, [state]);

  return (
    <div
      className="flex flex-col md:flex-row gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        size="small"
        text="Start"
        onClick={() => router.push(`/quiz/${quiz.id}/solve`)}
        className="w-full text-xs md:text-sm"
      />

      <Button
        size="small"
        text="Delete"
        color="bg-red-500 hover:bg-red-700"
        className="w-full text-xs md:text-sm"
        onClick={() => {
          setOpen(true);
        }}
      />

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <form action={formAction} className="space-y-4 p-4">
          <input type="hidden" name="quizId" id="quizId" value={quiz.id} />

          <p className="text-lg font-semibold text-gray-800 text-center">
            Are you sure you want to delete {quiz.name} quiz?
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <Button
              text="Cancel"
              onClick={() => setOpen(false)}
              color="bg-gray-400 hover:bg-gray-500"
            />

            <Button
              type="submit"
              text="Delete"
              color="bg-red-600 hover:bg-red-700"
              disabled={isPending}
            />
          </div>
        </form>
        {state?.status === "error" && (
          <p className="px-4 py-2 rounded text-sm font-medium bg-red-100 text-red-800">
            {state.message}
          </p>
        )}
      </Modal>
    </div>
  );
};
