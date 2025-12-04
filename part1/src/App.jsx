import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </div>
  );
};

// Button component
const Button =({ onClick, text }) => (
  <button onClick = {onClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

// Log each render
  console.log("current feedback count shows we have: good", good, "neutal:", neutral, "bad:" , bad);

  const handleGoodClick = () => {
    console.log("good button clicked. Value before click:", good);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    console.log("neutral button clicked. Value before click:", neutral);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    console.log("bad button clicked. Value before click:", bad);
    setBad(bad + 1);
  };

  return (
      <div>
        <h1>give feedback</h1>

        <Button onClick = {handleGoodClick} text = "good "/>
        <Button onClick = {handleNeutralClick} text = "neutral "/>
        <Button onClick = {handleBadClick} text = "bad "/>

        <h1>Statistics</h1>

        <p>good {good} </p>
        <p>neutral {neutral} </p>
        <p>bad {bad} </p>

       <Statistics good = {good} neutral={neutral} bad={bad}/>

      </div>
  );
};
export default App;