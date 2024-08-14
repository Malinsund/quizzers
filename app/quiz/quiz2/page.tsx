"use client";

import {
  OptionButton,
  QuestionTitle,
  QuizContainer,
  Result,
} from "@/app/styles/QuizStyles";
import { useState } from "react";

export default function Quiz2() {
  const questions = [
    {
      question:
        "Vilken skådespelare spelar Jack Sparrow i Pirates of the Caribbean?",
      options: [
        "Johnny Depp",
        "Leonardo DiCaprio",
        "Tom Hanks",
        "Robert Downey Jr.",
      ],
      correctAnswer: "Johnny Depp",
    },
    {
      question:
        "Vilken TV-serie innehåller karaktärerna Jon Snow och Daenerys Targaryen?",
      options: ["Breaking Bad", "Vikings", "Game of Thrones", "The Witcher"],
      correctAnswer: "Game of Thrones",
    },
    {
      question: "Vilken film innehåller frasen 'May the Force be with you'?",
      options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Avatar"],
      correctAnswer: "Star Wars",
    },
    {
      question:
        "I vilken sjukhusserie får vi följa Meredith, Christina, Alex, George och Izzie med flera?",
      options: ["Scrubs", "ER", "Grey's Anatomy", "Helt sjukt"],
      correctAnswer: "Grey's Anatomy",
    },
    {
      question:
        "Vad heter regissören/producenten till som bland annat gjort filmer som Edward Sciccorhands, Alice i underlandet och Sleepy Hallow?",
      options: [
        "Tim Burton",
        "Alfred Hitchcock",
        "Bruce Springsteen",
        "Marc Jacobs",
      ],
      correctAnswer: "Tim Burton",
    },
    {
      question:
        "I vilken musikal kan vi höra låtarna 'Hopelessly devoted to you' och 'Summer loving'?",
      options: ["Moulin Rouge", "Grease", "The greatest showman", "Hair"],
      correctAnswer: "Grease",
    },
    {
      question: "Hur många filmer om Harry Potter finns det?",
      options: ["5", "8", "7", "10"],
      correctAnswer: "8",
    },
    {
      question: "I vilken TV-serie kan vi höra repliken 'No soup for you'?",
      options: [
        "The Simpsons",
        "Two and a half men",
        "Seinfield",
        "The Witcher",
      ],
      correctAnswer: "Seinfield",
    },
    {
      question:
        "Vilken av dessa karaktärer är INTE med i disneyfilmen 'Lejonkungen'?",
      options: ["Sarabi", "Zazu", "Bonzai", "Rafiki"],
      correctAnswer: "Bonzai",
    },
    {
      question:
        "Fortsätt på den kända repliken: 'Man var ju nykter i morse, men... '?",
      options: [
        "..nu är jag inte det",
        "..nu börjar det ordna upp sig",
        "..nu går det fort utför",
        "..det var då det",
      ],
      correctAnswer: "..nu börjar det ordna upp sig",
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
