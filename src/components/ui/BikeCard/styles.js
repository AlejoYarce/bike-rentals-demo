import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const CardContainer = styled.div`
  position: relative;
  height: 44rem;
  width: 100%;
  max-width: 37rem;
  background-color: ${({ theme }) => theme.colors.primary.white};
  margin: 0 1rem;
  margin-bottom: 2rem;
  border-radius: 1.5rem;

  ${mq('lgs')`
    max-width: 29.3rem;
  `}

  ${mq('lgm')`
    max-width: 32rem;
  `}

  ${mq('lgl')`
    max-width: 26.5rem;
  `}

  ${mq('xl')`
    max-width: 27.5rem;
  `}
`

export const NotActiveContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.black}90;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: 1.8rem;
  font-weight: 700;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.topLevel};
  border-radius: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 2rem;

  span {
    border: 0.1rem solid;
    padding: 1rem;
    border-radius: 1.5rem;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-top-left-radius: 2.9rem;
  position: absolute;
  top: 27rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary.white};
  box-shadow: 0 -1rem 1.5rem 0 ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
`

export const Color = styled.span`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
`

export const ImageContainer = styled.div`
  height: 28rem;
  width: 100%;
  max-width: ${({ isOnlyOne }) => (isOnlyOne ? '37rem' : '100%')};
  margin: 0 auto;

  img {
    border-top-right-radius: 1.5rem;
    border-top-left-radius: 1.5rem;
  }

  ${({ isOnlyOne }) => mq('md')`
    height: 27rem;
    max-width: ${isOnlyOne ? '50rem' : '100%'};
  `}
`

export const ExtraInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`

export const ButtonAction = styled.button`
  background: ${({ theme }) => theme.colors.primary.endeavour};
  color: ${({ theme }) => theme.colors.primary.white};
  height: 5rem;
  width: 50%;
  border-top-left-radius: 3rem;
  border-bottom-right-radius: 1.5rem;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.black};
  }
`
