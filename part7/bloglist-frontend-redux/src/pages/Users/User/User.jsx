import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetailById } from "@/reducers/userReducer.js";

const User = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserDetailById(state, id));

  if (!user) return null;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center shadow-md rounded-lg p-4">
        <h1 className="font-medium mb-4">{user.name}</h1>
        <h4 className="mb-1">Added blogs:</h4>
        {user.blogs.length === 0 && <div>(Empty)</div>}

        {user.blogs.map((blog) => {
          return (
            <NavLink
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="block p-1 w-full hover:bg-black hover:text-white hover:cursor-pointer"
            >
              {blog.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default User;
