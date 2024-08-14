"use client";
import Link from "next/link";
import { QuizContainer, QuizOption, QuizTitle } from "../styles/QuizStyles";

export default function QuizPage() {
  return (
    <QuizContainer>
      <QuizTitle>Välj ett quiz</QuizTitle>
      <QuizOption>
        <Link style={{ textDecoration: "none" }} href="/quiz/quiz1">
          Quiz 1: Allmänbildning 📚
        </Link>
      </QuizOption>
      <QuizOption>
        <Link style={{ textDecoration: "none" }} href="/quiz/quiz2">
          Quiz 2: Film och TV 🎬
        </Link>
      </QuizOption>
    </QuizContainer>
  );
}
