"use client";
import {
  OptionButton,
  QuestionTitle,
  QuizContainer,
  Result,
} from "@/app/styles/QuizStyles";
import { useState } from "react";

export default function Quiz1() {
  const questions = [
    {
      question: "Vilket år började andra världskriget?",
      options: ["1939", "1945", "1914", "1941"],
      correctAnswer: "1939",
    },
    {
      question: "Vem skrev 'Till havs'?",
      options: [
        "Verner von Heidenstam",
        "Gustav Fröding",
        "Evert Taube",
        "Carl Michael Bellman",
      ],
      correctAnswer: "Evert Taube",
    },
    {
      question: "Vilken är världens längsta flod?",
      options: ["Amazonas", "Nilen", "Yangtze", "Mississippi"],
      correctAnswer: "Nilen",
    },
    {
      question: "Vilket land uppfann osthyveln?",
      options: ["Sverige", "Danmark", "USA", "Norge"],
      correctAnswer: "Norge",
    },
    {
      question: "Matematiska namnet på att lägga ihop något?",
      options: ["plussa", "Addera", "Tradera", "Flambera"],
      correctAnswer: "Addera",
    },
    {
      question: "Med vilken låt vann ABBA euorovision 1974?",
      options: ["Waterloo", "SOS", "Mamma Mia", "Super Truper"],
      correctAnswer: "Waterloo",
    },
    {
      question: "Vilken är Sveriges näst största stad?",
      options: ["Göteborg", "Stockholm", "Malmö", "Oskarshamn"],
      correctAnswer: "Göteborg",
    },
    {
      question: "VVad heter den största galaxen som hittills skådats?",
      options: ["Vintergatan", "Fornax", "Andromeda", "Alcyoneus"],
      correctAnswer: "Alcyoneus",
    },
    {
      question: "Vilket land har flest invånare per kvm?",
      options: ["Taiwan", "Indien", "Monaco", "Singapore"],
      correctAnswer: "Monaco",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <QuizContainer>
      {!showResult ? (
        <>
          <QuestionTitle>{questions[currentQuestion].question}</QuestionTitle>
          {questions[currentQuestion].options.map((option, index) => (
            <OptionButton key={index} onClick={() => handleAnswer(option)}>
              {option}
            </OptionButton>
          ))}
        </>
      ) : (
        <Result>
          Du fick {score} av {questions.length} rätt!
        </Result>
      )}
    </QuizContainer>
  );
}
