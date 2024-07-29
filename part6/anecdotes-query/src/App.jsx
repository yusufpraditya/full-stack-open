import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "./services/anecdotes";
import {
  sendNotification,
  useDispatchNotification,
  useTimeoutRef,
} from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useDispatchNotification();
  const timeoutRef = useTimeoutRef();

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.addVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(["anecdotes"], (oldAnecdotes) => {
        return oldAnecdotes.map((oldAnecdote) =>
          oldAnecdote.id === updatedAnecdote.id ? updatedAnecdote : oldAnecdote
        );
      });
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: false,
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
    sendNotification(
      dispatchNotification,
      timeoutRef,
      `You voted "${anecdote.content}"`
    );
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>error loading data</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
