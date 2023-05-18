import React from 'react';
import shortid from 'shortid';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const storedContacts = localStorage.getItem('contacts');
    this.state = {
      contacts: storedContacts ? JSON.parse(storedContacts) : [],
      filter: '',
    };
  }

  handleAddContact = (name, number) => {
    const existingContact = this.state.contacts.find((contact) => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleDeleteContact = (id) => {
    this.setState(
      (prevState) => ({
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactsForm
          contacts={contacts}
          onAddContact={this.handleAddContact}
          onLoadContacts={(loadedContacts) => this.setState({ contacts: loadedContacts })}
        />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <p className={css.contactsLabel}>Find contacts by name</p>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactsList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;
