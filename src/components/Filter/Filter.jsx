// import React from 'react';
// import PropTypes from 'prop-types';
// import css from './Filter.module.css';

// const Filter = ({ value, onChange }) => (
//   <input
//     type="text"
//     placeholder="Search contacts"
//     value={value}
//     onChange={onChange}
//     className={css.input}
//   />
// );

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default Filter;

import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search contacts"
    value={value}
    onChange={onChange}
    className={css.input}
  />
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
