import PropTypes from 'prop-types';

const commentShapes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hatId: PropTypes.string.isRequired,
});

export default { commentShapes };
