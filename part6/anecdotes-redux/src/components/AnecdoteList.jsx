import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const selectOrderedAndFilteredAnecdotes = (state) => {
  const sortedAnecdotes = state.anecdotes.toSorted((a, b) => b.votes - a.votes);

  if (state.filter === "") return sortedAnecdotes;

  return sortedAnecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()));
}

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectOrderedAndFilteredAnecdotes);

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`You voted "${content}"`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
