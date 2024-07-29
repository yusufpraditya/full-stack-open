import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.add(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes;
    const anecdote = state.find((a) => a.id === id);
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const updatedAnecdote = await anecdoteService.update(changedAnecdote);
    dispatch(
      setAnecdotes(state.map((a) => (a.id !== id ? a : updatedAnecdote)))
    );
  };
};

export default anecdoteSlice.reducer;
