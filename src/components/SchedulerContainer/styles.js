import { css } from '@emotion/react'
import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 0rem;
  padding: 2rem 0;

  ${mq('lg')`
    margin-bottom: 5rem;
  `}
`
export const ScheduleBikeAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;

  svg {
    height: 2.5rem;
    margin-left: 1.5rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }

  &:hover svg path {
    fill: ${({ theme }) => theme.colors.primary.endeavour};
  }
`
export const Content = styled.div`
  width: 100%;
  margin-top: 2rem;
  background-color: ${({ theme }) => `${theme.colors.primary.endeavour}10`};
  border-top: 0.2rem solid ${({ theme }) => theme.colors.primary.endeavour};
  padding: 0 2rem;
`
export const ScheduleContainer = styled.div`
  min-height: 100rem;
  padding-top: 2rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${mq('md')`
    min-height: 70rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `}

  ${mq('md')`
    justify-content: space-around;
  `}
`
export const SelectorContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  margin-top: 3rem;

  ${mq('md')`
    margin-top: 0;
    padding-left: 1rem;
  `}

  ${mq('lg')`
    padding-left: 0;
  `}
`
export const ScheduleSelector = styled.div`
  border-radius: 1.5rem;
  box-shadow: 0 0.2rem 2.3rem 0 ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding: 2rem 1.7rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const NoValidRange = styled.div`
  font-size: 1.4rem;
  text-align: justify;
  color: ${({ theme }) => theme.colors.primary.carnation};
`
export const BookingReview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.4rem;

  strong {
    font-size: 1.6rem;
  }
`
export const BookingReviewSpacer = styled.div`
  width: 16rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
`
export const BookingReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ flexStart }) => flexStart && css`
    align-items: flex-start;
  `};

  strong, span {
    margin-bottom: 1rem;
  }
`
