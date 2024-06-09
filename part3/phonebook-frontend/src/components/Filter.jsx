const Filter = ({ handleFilterByName }) => {
  return (
    <div>
      filter by name: <input onChange={handleFilterByName} />
    </div>
  );
};

export default Filter;
