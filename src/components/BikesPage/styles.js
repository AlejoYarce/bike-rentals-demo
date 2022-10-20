import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const BikesPageContainer = styled.div`
  width: 100%;
  max-width: 144rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  ${mq('md')`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  `}
`

export const BikesDataContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

  ${mq('lg')`
    width: 78.3rem;
    max-width: 120rem;
    justify-content: flex-start;
  `}

  ${mq('lgs')`
    width: 94rem;
  `}

  ${mq('lgm')`
    width: 102rem;
  `}

  ${mq('lgl')`
    width: 118rem;
  `}
`
