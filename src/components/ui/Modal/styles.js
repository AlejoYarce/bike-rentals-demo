import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'
import Button from '~app/components/ui/Button'

export const ModalContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => `${theme.colors.primary.black}50`};
  z-index: ${({ theme }) => theme.zIndex.modal};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  max-width: 35rem;
  overflow-y: auto;
  opacity: 1;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 1.5rem;
  padding: ${({ padding }) => padding || '1rem'};
  position: relative;

  ${mq('md')`
    max-width: 40rem;
  `}
`
export const ClosewButton = styled(Button)`
  height: 4rem;
  width: 4rem;
  position: absolute;
  float: right;
  top: 0rem;
  right: 0rem;
  padding: 1rem;
  background-color: transparent;

  svg {
    path {
      fill: ${({ theme }) => theme.colors.primary.black};
    }
  }

  &:hover {
    background-color: transparent;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.black};
      }
    }
  }
`
export const ConfirmationContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 1rem;
`
export const IconContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.endeavour};
  padding: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  text-align: center;

  svg {
    height: 5rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.white};
    }
  }
`
export const ConfirmationContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.buttonsMarginTop};

  button {
    width: 15.5rem;
    margin-left: 2rem;
    
    &:first-of-type {
      margin: 0;
    }

    &:only-child {
      margin: 0;
    }
  }
`
