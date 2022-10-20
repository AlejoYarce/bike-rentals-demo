import { styled } from '~app/styles/theme'

const getFontWeight = ({ isToday }) => {
  if (isToday) {
    return 700
  }

  return 500
}

export const Container = styled.div`
  width: 100%;
  max-width: 27rem;
  margin: 0 auto;
`
export const RowContainer = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 1.4rem;
    font-weight: ${(props) => getFontWeight(props)};
  }
`
export const DayContainer = styled.div`
  display: flex;
  align-items: center;
`
export const OpenStatus = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.endeavour};
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
`
