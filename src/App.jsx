import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [tenzie, setTenzies] = useState(false);
  const [dice, setDice] = useState(allDice());
  const [currentRoll, setCurrentRoll] = useState(0);
  const [manyRolls, setManyRolls] = useState(() => {
    return JSON.parse(localStorage.getItem("manyRolls")) || 0;
  });
  const [fewRolls, setFewRolls] = useState(
    () => JSON.parse(localStorage.getItem("fewRolls")) || 0
  );
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const fistValue = dice[0].value;
    const allHaveSameValue = dice.every((die) => die.value === fistValue);
    if (allHeld && allHaveSameValue) {
      setTenzies(true);
      // best rolls manipulation
      const savedManyRolls = localStorage.getItem("manyRolls");
      setManyRolls(savedManyRolls);

      const savedFewRolls = localStorage.getItem("fewRolls");
      setFewRolls(savedFewRolls);
    } else {
      setTenzies(false);
    }
  }, [dice]);
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }
  function handleRoll() {
    if (!tenzie) {
      setDice((olDice) =>
        olDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
      setCurrentRoll((prevRoll) => prevRoll + 1);
    } else {
      setTenzies(false);
      setDice(allDice);
      setCurrentRoll(0);
    }
  }
  function holdDie(id) {
    setDice((olDice) =>
      olDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => holdDie(die.id)}
    />
  ));

  return (
    <>
      {tenzie && <Confetti />}
      <div className="slide">
        <h1>Tenzies-Game</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. Curent Rolls
          <sub className="current-rolls">({currentRoll})</sub>
        </p>

        <div className="dice-container">{diceElement}</div>
        <div className="down-part">
          <button className="roll-button" onClick={handleRoll}>
            {tenzie ? "New-Game" : "Roll"}
          </button>
          <div className="roll-wellness">
            <h4>
              <u>Best Rolls</u>
            </h4>
            <p className="">
              <span className="well-title">Few</span>
              <span className="well-value"> {fewRolls}</span>
            </p>
            <p className="">
              <span className="well-title">Many</span>
              <span className="well-value"> {manyRolls}</span>
            </p>
            <hr />
            <p>
              <span className="well-title">Current Rolls</span>
              <span className="current-rolls"> {currentRoll}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
