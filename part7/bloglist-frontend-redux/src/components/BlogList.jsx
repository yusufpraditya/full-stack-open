import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = ({ loggedUser }) => {
  const blogs = useSelector((state) => state.blogList);

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
      ))}
    </div>
  );
};

export default BlogList;
