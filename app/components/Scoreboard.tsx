import React, { useEffect, useState } from "react";
import { ScoreboardDiv, ScoreboardList } from "../styles/QuizStyles";

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState<{ username: string; score: number }[]>(
    []
  );

  useEffect(() => {
    const savedScores = localStorage.getItem("scoreboard");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  return (
    <ScoreboardDiv>
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score, index) => (
          <ScoreboardList key={index}>
            {score.username}: {score.score}
          </ScoreboardList>
        ))}
      </ul>
    </ScoreboardDiv>
  );
};

export default Scoreboard;
