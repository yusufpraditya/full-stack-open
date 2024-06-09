const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((coursePart) => (
        <Part key={coursePart.id} part={coursePart} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>
        Number of exercises{" "}
        {props.parts
          .map((val) => val.exercises)
          .reduce((accumulator, currentValue) => accumulator + currentValue)}
      </p>
    </div>
  );
};

export default Course;