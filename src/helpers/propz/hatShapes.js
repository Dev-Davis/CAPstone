import PropTypes from 'prop-types';

const hatShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  colorWay: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export default { hatShape };
