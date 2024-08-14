import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
