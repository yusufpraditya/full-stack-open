import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const addAnecdote = async (content) => {
  const obj = {
    content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, obj);

  return response.data;
};

const addVote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);

  return response.data;
};

export default { getAll, addAnecdote, addVote };
