import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(addAnecdote(content));
    dispatch(setNotification(`You created "${content}"`, 5));
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" autoComplete="off"/>
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
