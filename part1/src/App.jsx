import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Button component
  const Button =({ onClick, text }) => (
    <button onClick = {onClick}>{text}</button>
  );

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

      </div>
  );
};
export default App;