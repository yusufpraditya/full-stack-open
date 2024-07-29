const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cvpfus:${password}@cluster0.olrpsq1.mongodb.net/TestBlogList?retryWrites=true&w=majority&appName=Cluster0`;

console.log(url)

mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  });
  const Blog = mongoose.model("Blog", blogSchema);

  const blog = new Blog({
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  });

  blog.save().then(() => {
    console.log("note saved!");
    mongoose.connection.close();
  });

  // Note.find({}).then(result => {
  //   result.forEach(note => {
  //     console.log(note)
  //   })
  //   mongoose.connection.close()
  // })
});
