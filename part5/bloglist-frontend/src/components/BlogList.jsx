import Blog from "./Blog";

const BlogList = ({ blogs, loggedUser, likeBlog, deleteBlog }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={loggedUser}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
