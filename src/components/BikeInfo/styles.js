import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const DetailsInfoContainer = styled.div`
  width: 100%;
  border-radius: 1.5rem;
  
  ${mq('md')`
    max-width: 88rem;
  `}

  ${mq('lg')`
    width: 78rem;
  `}
`
export const HeaderContainer = styled.div`
  width: 100%;
`
export const InlineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mq('sm')`
    flex-direction: row;
  `}
`
export const Location = styled.p`
  text-align: justify;
  padding-top: 0.3rem;
  margin: 0rem;
  margin-right: 1rem;
  font-size: 1.4rem;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary.white};
`
export const SliderContainer = styled.div`
  margin-top: 2rem;

  ${mq('md')`
    max-width: 90rem;
    margin: 0 auto;
    margin-top: 2rem;
  `}

  ${mq('lg')`
    max-width: 72rem;

    @media screen and (min-width: 1050px) {
      max-width: 74rem;
    }
    @media screen and (min-width: 1100px) {
      max-width: 80rem;
    }
    @media screen and (min-width: 1150px) {
      max-width: 84rem;
    }    
  `}

  ${mq('lgs')`
    max-width: 88rem;
  `}
`
export const ImageContainer = styled.div`
  height: 32rem;
  width: 100%;
  max-width: ${({ isOnlyOne }) => (isOnlyOne ? '37rem' : '100%')};
  margin: 0 auto;

  ${({ isOnlyOne }) => mq('md')`
    height: 34rem;
    max-width: ${isOnlyOne ? '50rem' : '100%'};
  `}
`
