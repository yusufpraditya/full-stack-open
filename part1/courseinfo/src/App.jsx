const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.title} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts
          .map((val) => val.exercises)
          .reduce((accumulator, currentValue) => accumulator + currentValue)}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        title: "Fundamentals of React",
        exercises: 10,
      },
      {
        title: "Using props to pass data",
        exercises: 7,
      },
      {
        title: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header title={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
