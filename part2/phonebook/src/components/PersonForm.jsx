const PersonForm = ({
  handleFormSubmit,
  handleNameChange,
  handleNumberChange,
  nameValue,
  numberValue,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
