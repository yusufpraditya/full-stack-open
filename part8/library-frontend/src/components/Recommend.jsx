import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, USER } from "../queries/index.js";

export const Recommend = () => {
  const userResult = useQuery(USER);
  const booksByGenreResult = useQuery(BOOKS_BY_GENRE, {
    skip: !userResult.data?.me?.favoriteGenre,
    variables: {
      genre: userResult.data?.me?.favoriteGenre,
    },
  });

  if (userResult.loading || booksByGenreResult.loading)
    return <div>Loading...</div>;

  const books = booksByGenreResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {userResult.data.me.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
