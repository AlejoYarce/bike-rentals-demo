import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { FloatingMenuContainer, FloatingMenuItem } from './styles'

const FloatingMenu = ({ menu, onClickRef }) => {
  const router = useRouter()

  const onItemClick = (item) => {
    router.push(item.link)
    if (item.callback) {
      item.callback()
    }
  }

  return (
    <FloatingMenuContainer className="box-shadow" ref={onClickRef}>
      {menu.map((item, idx) => (
        <FloatingMenuItem key={idx} onClick={() => onItemClick(item)}>
          {item.name}
        </FloatingMenuItem>
      ))}
    </FloatingMenuContainer>
  )
}

FloatingMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(),
  ]).isRequired,
}

export default FloatingMenu
