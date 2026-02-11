"use server"
import { Question } from "@/types/quiz";
import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL;

export async function createQuiz(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    if (!API_URL) {
        return { status: "error", message: "API not configured" };
    }
    
    const questions = JSON.parse(data.questions as string);
    const questionsData: Question[] = data.existingQuestions
        ? JSON.parse(data.existingQuestions as string) as Question[]
        : [];

    if(questions.length === 0) {
        return { status: "error", message: "At least one question is required" };
    }

    const createdQuestions: Question[] = [];

    for (const q of questions) {

        const existing = questionsData.find(
            (d) => d.question.trim().toLowerCase() === q.question.trim().toLowerCase()
        );

        let res;

        if (existing) {
            res = await fetch(`${API_URL}/questions/${existing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q.question, answer: q.answer }),
            });
        } else {
            res = await fetch(`${API_URL}/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q.question, answer: q.answer }),
            });
        }

        createdQuestions.push(await res.json());
    }   

    const res = await fetch(`${API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            questions: createdQuestions.map(q => ({
                id: q.id,
                question: q.question,
                answer: q.answer,
            })),
        }),
    });

    if (!res.ok) {
        return { status: "error", message: "Failed to create quiz" };
    }

    revalidatePath("/");
    return { status: "success", message: `Quiz "${data.name}" created successfully!` };
}

export async function deleteQuiz(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    if (!API_URL) {
        return { status: "error", message: "API not configured" };
    }
    const res = await fetch(API_URL + "/quizzes/" + data.quizId, {
        method: "DELETE",
    });

    if (!res.ok) {
        return { status: "error", message: "Failed to delete quiz" };
    }

    revalidatePath("/");
    return { status: "success", message: `Quiz with id "${data.quizId}" deleted successfully!` };
}

export async function updateQuiz(prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    if (!API_URL) {
        return { status: "error", message: "API not configured" };
    }

    const questions = JSON.parse(data.questions as string);
    const questionsData: Question[] = data.existingQuestions
        ? JSON.parse(data.existingQuestions as string) as Question[]
        : [];

    if(questions.length === 0) {
        return { status: "error", message: "At least one question is required" };
    }

    const createdQuestions: Question[] = [];

    for (const q of questions) {

        const existing = questionsData.find(
            (d) => d.question.trim().toLowerCase() === q.question.trim().toLowerCase()
        );

        let res;

        if (existing) {
            res = await fetch(`${API_URL}/questions/${existing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q.question, answer: q.answer }),
            });
        } else {
            res = await fetch(`${API_URL}/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q.question, answer: q.answer }),
            });
        }

        createdQuestions.push(await res.json());
    }   

    const res = await fetch(API_URL + "/quizzes/" + data.quizId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            questions: createdQuestions.map((q) => ({
                id: q.id,
                question: q.question,
                answer: q.answer,
            })),
        }),
    });

    if (!res.ok) {
        return { status: "error", message: "Failed to update quiz" };
    }

    revalidatePath("/");
    return { status: "success", message: `Quiz "${data.name}" updated successfully!` };
}