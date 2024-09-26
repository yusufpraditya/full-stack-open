import { CoursePart } from "../types";
import Part from "./Part.tsx";

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <>
      {courseParts.map((part, index) => {
        return (
          <div key={index} style={{marginBottom: "8px"}}>
            <Part part={part} />
          </div>
        );
      })}
    </>
  );
};

export default Content;
