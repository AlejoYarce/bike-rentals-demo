import PropTypes from 'prop-types'

export const bikeProps = PropTypes.shape({
  id: PropTypes.string,
  model: PropTypes.string,
  queryModel: PropTypes.shape(),
  color: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
  reviews: PropTypes.shape({
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
    avg: PropTypes.number,
    qty: PropTypes.number,
  }),
  status: PropTypes.bool,
})

export const bikesDataProps = PropTypes.arrayOf(bikeProps)

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

export const userProps = PropTypes.shape({
  id: PropTypes.string,
  email: PropTypes.string,
  isAdmin: PropTypes.bool,
  status: PropTypes.bool,
})
