import { useState } from "react";

const HeaderText = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ feedbacks }) => {
  if (feedbacks.total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={feedbacks.good} />
        <StatisticLine text="neutral" value={feedbacks.neutral} />
        <StatisticLine text="bad" value={feedbacks.bad} />
        <StatisticLine text="total" value={feedbacks.total} />
        <StatisticLine text="average" value={feedbacks.average} />
        <StatisticLine text="positive" value={`${feedbacks.positive} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  const feedbacks = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: isNaN(average) ? 0 : average,
    positive: isNaN(positive) ? 0 : positive,
  };

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <HeaderText text="Give feedback" />
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />

      <HeaderText text="Statistics" />
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;
