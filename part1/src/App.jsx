import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <div>
      <StatisticLine text = "Good" value = {good} />
      <StatisticLine text = "Neutral" value = {neutral} />
      <StatisticLine text = "Bad" value = {bad} />
      <StatisticLine text = "Total" value = {total} />
      <StatisticLine text = "Average" value = {average} />
      <StatisticLine text = "Positive" value = {positive + "%"} />
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

        <Statistics good = {good} neutral={neutral} bad={bad}/>

      </div>
  );
};
export default App;