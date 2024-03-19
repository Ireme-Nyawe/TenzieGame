import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allDice());
  function generateNewDice(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }
  function allDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }
  function handleRoll() {
    setDice((olDice) =>
      olDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      })
    );
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
    <div className="slide">
      <div className="dice-container">{diceElement}</div>
      <button className="roll-button" onClick={handleRoll}>
        Roll
      </button>
    </div>
  );
}
