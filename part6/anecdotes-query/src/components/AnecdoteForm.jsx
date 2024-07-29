import anecdoteService from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendNotification,
  useDispatchNotification,
  useTimeoutRef,
} from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useDispatchNotification();
  const timeoutRef = useTimeoutRef();

  const addAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(["anecdotes"], (oldAnecdotes) => {
        return oldAnecdotes.concat(newAnecdote);
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addAnecdoteMutation.mutate(content, {
      onSuccess: () => {
        sendNotification(
          dispatchNotification,
          timeoutRef,
          `You created "${content}"`
        );
      },
      onError: () => {
        sendNotification(
          dispatchNotification,
          timeoutRef,
          "too short anecdote, must have length 5 or more"
        );
      },
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
