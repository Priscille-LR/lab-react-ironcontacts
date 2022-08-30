import { useState } from 'react';
import contactsData from './contacts.json';
import './App.css';

function App() {
  const firstFiveContacts = contactsData.slice(0, 5);
  const restOfContacts = contactsData.slice(5);
  const [contacts, setContacts] = useState(firstFiveContacts);

  const addRandomContact = () => {
    const randomContact =
      restOfContacts[Math.floor(Math.random() * restOfContacts.length)];
    setContacts((contacts) => [...contacts, randomContact]);
  };

  const sortByPopularity = () => {
    const contactsCopy = [...contacts];
    contactsCopy.sort((a, b) => b.popularity - a.popularity);
    setContacts(contactsCopy);
  };

  const sortByName = () => {
    const contactsCopy = [...contacts];
    contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(contactsCopy);
  };

  const deleteContact = (id) => {
    const contactsCopy = [...contacts];
    const contactToDelete = contactsCopy.filter((el) => el.id === id)[0];
    contactsCopy.splice(contactsCopy.indexOf(contactToDelete), 1);
    setContacts(contactsCopy);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <div className='buttons'>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort By Popularity</button>
        <button onClick={sortByName}>Sort By Name</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(
            ({ id, pictureUrl, name, popularity, wonOscar, wonEmmy }) => {
              return (
                <tr key={id}>
                  <td>
                    <img src={pictureUrl} alt='' />
                  </td>
                  <td>{name}</td>
                  <td>{popularity.toFixed(2)}</td>
                  <td>{wonOscar ? '🏆' : ''}</td>
                  <td>{wonEmmy ? '🌟' : ''}</td>
                  <td>
                    <button className='delete-btn' onClick={() => deleteContact(id)}>Delete</button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
