import { CoursePart } from "../types";

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
        </>
      );
    case "group":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>project exercises: {part.groupProjectCount}</div>
        </>
      );
    case "background":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>background material: {part.backgroundMaterial}</div>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </>
      );
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(part)}`,
      );
  }
};

export default Part;
