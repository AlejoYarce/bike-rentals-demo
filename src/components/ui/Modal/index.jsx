import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { ClosewButton, ModalContainer, ModalContent } from './styles'
import X from '~app/components/ui/icons/X'

const Modal = (props) => {
  const {
    children,
    showModal,
    onClose,
    showCloseButton,
    padding,
  } = props

  if (showModal) {
    return (
      <ModalContainer>
        <ModalContent padding={padding}>
          {
            showCloseButton && (
              <ClosewButton
                callback={() => onClose()}
                ariaLabel="close modal"
                icon
              >
                <X />
              </ClosewButton>
            )
          }
          {children}
        </ModalContent>
      </ModalContainer>
    )
  }

  return null
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  padding: PropTypes.string,
}

Modal.defaultProps = {
  showModal: false,
  onClose: noop,
  showCloseButton: true,
  padding: '',
}

export default Modal
