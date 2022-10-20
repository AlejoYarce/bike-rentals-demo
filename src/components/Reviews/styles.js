import { styled } from '~app/styles/theme'

export const Description = styled.p`
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-align: justify;
  line-height: 1.3;
`
export const RatingSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;  
  margin-top: 2rem;
`
export const Separator = styled.div`
  width: 100%;
  margin-top: 2rem;
  border-top: 0.4rem solid ${({ theme }) => theme.colors.primary.endeavour};
`
export const RatingContainer = styled.div`
  padding-top: ${({ noPaddingTop }) => (noPaddingTop ? 0 : '0.5rem')};
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  align-items: center;
`
export const StarsContainer = styled.div`
  height: 2.2rem;
  display: flex;
  justify-content: space-between;
`
export const ReviewsContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme, fontColor }) => fontColor || theme.colors.primary.black};

  span:last-child {
    font-weight: 400;
    margin-left: 0.5rem;
  }

  span:only-child {
    font-weight: 700;
    margin-left: 0rem;
    font-size: 1.6rem;
  }
`
export const ChartContainer = styled.div`
  width: 100%;
`
export const ChartRow = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;

  svg {
    height: 2rem;
    margin-right: 1rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }
`
export const StartLabel = styled.p`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: 0.2rem;
`
export const Percentage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
  border-radius: 0.3rem;
  
  div {
    height: 1.2rem;
    width: ${(props) => `${props.percentage}%`};
    background-color: ${({ theme }) => theme.colors.primary.endeavour};
    border-radius: 0.3rem;
  }
`
export const QtyLabel = styled.p`
  margin: 0;
  margin-left: 1rem;
  font-size: 1.6rem;
  min-width: 3rem;
  text-align: right;
`
