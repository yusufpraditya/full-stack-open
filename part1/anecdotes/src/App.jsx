import { useState } from "react";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};

const Vote = ({ value }) => {
  return <p>{`has ${value} votes`}</p>;
};

const TopVotes = ({ text, value }) => {
  if (value === 0) {
    return <p>No votes given</p>;
  }

  return (
    <>
      <Anecdote text={text} />
      <Vote value={value} />
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = {
    0: {
      text: "If it hurts, do it more often.",
      votes: 0,
    },
    1: {
      text: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    2: {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    3: {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    4: {
      text: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    5: {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    6: {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    7: {
      text: "The only way to go fast, is to go well.",
      votes: 0,
    },
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const anecdotesLength = Object.keys(anecdotes).length - 1;
  let randomIndex = getRandomInt(anecdotesLength);

  const [selected, setSelected] = useState(randomIndex);
  const [votes, setVote] = useState({ ...anecdotes });

  const sortedVotes = Object.values(votes).sort((a, b) => b.votes - a.votes);

  const handleVote = () => {
    const votesCopy = { ...votes };
    votesCopy[selected].votes += 1;

    setVote(votesCopy);
  };

  const handleNextAnecdote = () => {
    randomIndex = getRandomInt(anecdotesLength);

    setSelected(randomIndex);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected].text} />
      <Vote value={votes[selected].votes} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <TopVotes text={sortedVotes[0].text} value={sortedVotes[0].votes} />
    </div>
  );
};

export default App;
