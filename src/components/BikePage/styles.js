import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const Banner = styled.div`
  height: 25rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.endeavour};
  margin-top: ${({ theme }) => theme.heights.navbarSm}rem;

  ${({ theme }) => mq('md')`
    margin-top: ${theme.heights.navbar}rem;
  `}
`
export const BikePageContainer = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  margin-top: -22rem;
  padding: 0 1rem;

  ${mq('lg')`
    margin-top: -20rem;
  `}
`
export const BikePageContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;

  ${mq('lg')`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  `}
`
