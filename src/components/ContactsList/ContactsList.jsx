import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

class ContactsList extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
    }
  }

  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className={css.list}>
        {contacts.map((contact) => (
          <li key={contact.id} className={css.item}>
            <p className={css.name}>{contact.name}</p>
            <p className={css.number}>{contact.number}</p>
            <button className={css.deleteButton} onClick={() => onDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactsList;
