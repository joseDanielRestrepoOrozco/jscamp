import { Link as NavLink } from 'react-router'

const Link = ({ href, children, ...restOfProps }) => {
  return (
    <NavLink to={href} {...restOfProps}>
      {children}
    </NavLink>
  )
}

export default Link
