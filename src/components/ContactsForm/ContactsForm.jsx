import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsForm.module.css';

class ContactsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: ''
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.props.onLoadContacts(JSON.parse(storedContacts));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts !== this.props.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    const formattedName = this.formatName(name.trim());
    this.props.onAddContact(formattedName, number);
    this.setState({ name: '', number: '' });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formatName = (name) => {
    const [firstName, ...lastName] = name.split(' ');
    const formattedFirstName = this.capitalizeFirstLetter(firstName.toLowerCase());
    const formattedLastName = lastName.map((part) => this.capitalizeFirstLetter(part.toLowerCase()));
    return [formattedFirstName, ...formattedLastName].join(' ');
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.contactsForm} onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={this.handleChange}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={number}
          onChange={this.handleChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  onAddContact: PropTypes.func.isRequired,
  onLoadContacts: PropTypes.func.isRequired
};

export default ContactsForm;
