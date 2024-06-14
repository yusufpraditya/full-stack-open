const mongoose = require("mongoose");

let name, number;

if (process.argv.length <= 2) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log("give number as argument");
  process.exit(1);
}

if (process.argv.length === 5) {
  name = process.argv[3];
  number = process.argv[4];
}

const password = process.argv[2];

const url = `mongodb+srv://cvpfus:${password}@cluster0.olrpsq1.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

if (name && number) {
  person.save().then((result) => {
    console.log(
      `added ${result.name} with number ${result.number} to phonebook`
    );
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log("Phonebook:")
    persons.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
