import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries/index.js";
import { useState } from "react";

const Authors = () => {
  const queryResult = useQuery(ALL_AUTHORS);

  const [updateAuthor, mutationResult] = useMutation(UPDATE_AUTHOR);

  console.log(mutationResult, queryResult);

  const [birthYear, setBirthYear] = useState("");

  if (queryResult.loading) return <div>Loading...</div>;

  const authors = queryResult.data.allAuthors;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formEntries = Object.fromEntries(formData.entries());

    await updateAuthor({
      variables: {
        name: formEntries.selectedAuthor,
        setBornTo: Number(birthYear),
      },
    });

    setBirthYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h3>Set birth year</h3>
        <select name="selectedAuthor">
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          <span>Born </span>
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button>Update author</button>
      </form>
    </div>
  );
};

export default Authors;
