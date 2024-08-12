import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogList);

  const sortedBlogs = [...blogs].toSorted((a, b) => b.likes - a.likes);

  return (
    <div className="m-2 w-full">
      <h4 className="mt-1 mb-2 text-center">List of blogs</h4>
      {sortedBlogs &&
        sortedBlogs.map((blog) => (
          <NavLink
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="block p-1 my-1 hover:bg-black hover:text-white hover:cursor-pointer"
          >
            {blog.title}
          </NavLink>
        ))}
    </div>
  );
};

export default BlogList;
