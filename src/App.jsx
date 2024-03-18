import { useState } from "react";
import Die from "./components/Die";

export default function App() {
  const[dice,setDice]=useState(allDice())
  function allDice(){
    const newDice = []
    for (let i=0; i<10;i++){
      newDice.push(Math.ceil(Math.random()*6))
    }
    return newDice;
  }
  const diceElement=dice.map(die=> <Die value={die} />)
  return (
    <div className="slide">
      <div className="dice-container">
      {diceElement}
      </div>
    </div>
  );
}
