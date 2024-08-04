import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetailById } from "@/reducers/userReducer.js";

const User = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserDetailById(state, id));

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
