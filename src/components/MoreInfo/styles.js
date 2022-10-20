import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const MoreInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  justify-content: center;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }

  ${mq('lg')`
    width: 28.5rem;
    margin-right: 2rem;
    margin-top: 0rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `}
`
export const WhiteCardContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding: 2rem;
  margin-bottom: 2rem;

  ${mq('sm')`
    margin: 0 1rem;
    margin-bottom: 2rem;
  `};

  ${mq('md')`
    max-width: 35rem;
  `};

  ${mq('lg')`
    max-width: 40rem;
    margin: 0rem;
    margin-bottom: 2rem;
  `};
`
