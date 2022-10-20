import React from 'react'
import PropTypes from 'prop-types'

import { theme } from '~app/styles/theme'
import Modal from '.'
import {
  ButtonsContainer,
  ConfirmationContainer,
  ConfirmationContent,
  IconContainer,
} from './styles'
import Button from '../Button'
import Warning from '~app/components/ui/icons/Warning'
import X from '~app/components/ui/icons/X'
import CheckedCircle from '~app/components/ui/icons/CheckedCircle'

const Confirmation = (props) => {
  const {
    type,
    showConfirmation,
    noLabel,
    yesLabel,
    onClose,
    onYes,
    disableYesButton,
    yesColor,
    showLoader,
    children,
    overrideIcon,
    buttonsMarginTop,
  } = props

  let icon = <Warning />
  if (type === 'danger') {
    icon = <X />
  }

  if (type === 'success') {
    icon = <CheckedCircle />
  }

  if (type === 'blank' && overrideIcon) {
    icon = overrideIcon
  }

  return (
    <Modal
      showModal={showConfirmation}
      onClose={onClose}
      showCloseButton={false}
      padding="0"
    >
      <ConfirmationContainer>
        <IconContainer>{icon}</IconContainer>
        <ConfirmationContent>
          {children}
          <ButtonsContainer buttonsMarginTop={buttonsMarginTop}>
            <Button
              callback={onClose}
              stroked
            >
              {noLabel}
            </Button>
            {
              onYes && (
                <Button
                  callback={onYes}
                  disabled={showLoader || disableYesButton}
                  strokedColor={type === 'danger' ? theme.colors.primary.carnation : yesColor}
                  showLoader={showLoader}
                  stroked
                >
                  {yesLabel}
                </Button>
              )
            }
          </ButtonsContainer>
        </ConfirmationContent>
      </ConfirmationContainer>
    </Modal>
  )
}

Confirmation.propTypes = {
  type: PropTypes.oneOf(['danger', 'success', 'warning', 'blank']).isRequired,
  showConfirmation: PropTypes.bool.isRequired,
  noLabel: PropTypes.string.isRequired,
  yesLabel: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onYes: PropTypes.func,
  disableYesButton: PropTypes.bool,
  yesColor: PropTypes.string,
  showLoader: PropTypes.bool,
  children: PropTypes.node.isRequired,
  buttonsMarginTop: PropTypes.string,
  overrideIcon: PropTypes.node,
}

Confirmation.defaultProps = {
  yesColor: theme.colors.primary.endeavour,
  showLoader: false,
  disableYesButton: false,
  buttonsMarginTop: '10px',
  overrideIcon: null,
  yesLabel: '',
  onYes: null,
}

export default React.memo(Confirmation)
