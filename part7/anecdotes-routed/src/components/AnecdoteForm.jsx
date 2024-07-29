import { useField } from "../hooks";

const AnecdoteForm = (props) => {
  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");

  const { reset: resetContent, ...content } = contentField;
  const { reset: resetAuthor, ...author } = authorField;
  const { reset: resetInfo, ...info } = infoField;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} autoComplete="off" />
        </div>
        <div>
          author
          <input {...author} autoComplete="off" />
        </div>
        <div>
          url for more info
          <input {...info} autoComplete="off" />
        </div>
        <button>create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
