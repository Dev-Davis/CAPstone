import PropTypes from 'prop-types';

const userShapes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
});

export default { userShapes };