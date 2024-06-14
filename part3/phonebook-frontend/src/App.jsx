import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
      setFilteredPersons(response);
    });
  }, []);

  const handleFilterByName = (event) => {
    const newFilteredPersons = [...persons].filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(newFilteredPersons);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const sendNotification = (message) => {
    setNotificationMessage(message);

    setTimeout(() => setNotificationMessage(null), 2500);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setNewName("");
    setNewNumber("");

    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (person.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        return;
      }

      if (!newNumber) {
        sendNotification({
          type: "error",
          message: "Error: Number is missing",
        });
        return;
      }

      const replaceOldNumber = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (replaceOldNumber) {
        const replacedNumber = {
          ...person,
          number: newNumber,
        };

        personService
          .update(person.id, replacedNumber)
          .then((response) => {
            const newPersons = persons.map((person) =>
              person.id !== response.id ? person : response
            );
            setPersons(newPersons);
            setFilteredPersons(newPersons);

            sendNotification({
              type: "success",
              message: `${person.name}'s new number: ${newNumber}`,
            });
          })
          .catch((error) => {
            console.log(error)
            sendNotification({
              type: "error",
              message: `${person.name} has already been deleted. Please reload the page`,
            });
          });
        return;
      }
      return;
    }

    if (!newName && !newNumber) {
      sendNotification({
        type: "error",
        message: "Error: Name & Number are missing",
      });
      return;
    }

    if (!newName) {
      sendNotification({ type: "error", message: "Error: Name is missing" });
      return;
    }

    if (!newNumber) {
      sendNotification({ type: "error", message: "Error: Number is missing" });
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((response) => {
        const newPersons = persons.concat(response);
        setPersons(newPersons);
        setFilteredPersons(newPersons);

        setNewName("");
        setNewNumber("");

        sendNotification({
          type: "success",
          message: `Added ${newName}`,
        });
      })
      .catch((error) =>
        sendNotification({ type: "error", message: error.message })
      );
  };

  const handleDelete = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    const deleteConfirmed = confirm(`Delete ${personName}?`);

    if (deleteConfirmed) {
      personService
        .deleteById(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id != id);
          setPersons(newPersons);
          setFilteredPersons(newPersons);
          console.log(newPersons);
        })
        .catch(() => {
          sendNotification({
            type: "error",
            message: `${personName} has already been deleted. Please reload the page`,
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter handleFilterByName={handleFilterByName} />
      <h3>Add a new person</h3>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
