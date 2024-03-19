import { useState } from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = useState(allDice());
  function allDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
    }
    return newDice;
  }
  function handleRoll() {
    setDice(allDice());
  }
  const diceElement = dice.map((die) => (
    <Die value={die.value} isHeld={die.isHeld} />
  ));
  return (
    <div className="slide">
      <div className="dice-container">{diceElement}</div>
      <button className="roll-button" onClick={handleRoll}>
        Roll
      </button>
    </div>
  );
}
