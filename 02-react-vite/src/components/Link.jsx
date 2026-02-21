import { useRouter } from '../hooks/useRouter'

const Link = ({ href, children, ...restOfProps }) => {
  const { navigateTo, currentPath } = useRouter()

  const handleClick = event => {
    event.preventDefault()

    navigateTo(href)
  }

  const styleAnchor =
    href === currentPath ? { opacity: 0.5, pointerEvents: 'none' } : {}
  return (
    <a style={styleAnchor} href={href} {...restOfProps} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
