import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE } from "../queries/index.js";
import { useState } from "react";

const Books = () => {
  const allBooksResult = useQuery(ALL_BOOKS);
  const allGenresResult = useQuery(ALL_GENRES);
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(BOOKS_BY_GENRE);

  const [genre, setGenre] = useState("all");

  if (
    allBooksResult.loading ||
    allGenresResult.loading ||
    booksByGenreResult.loading
  )
    return <div>Loading...</div>;

  const books =
    genre === "all"
      ? allBooksResult.data.allBooks
      : booksByGenreResult.data.allBooks;
  const genres = allGenresResult.data.allGenres;

  const handleGenre = async (genre) => {
    try {
      await getBooksByGenre({
        variables: {
          genre: genre,
        },
      });
      setGenre(genre);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAllGenres = async () => {
    await allBooksResult.refetch();
    setGenre("all");
  };

  return (
    <div>
      <h2>books</h2>

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

      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={handleAllGenres}>all genres</button>
    </div>
  );
};

export default Books;
