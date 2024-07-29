const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, val) => acc + val);
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.sort((a, b) => b.likes - a.likes)[0];

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
