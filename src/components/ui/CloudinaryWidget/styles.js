import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const CloudinaryWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2rem;
`
export const TitleRow = styled.div`
  width: 9rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 1.6rem;
    height: 1.6rem;
  }
`
export const ImageRowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`
export const ImagePreview = styled.div`
  height: ${({ isSquare }) => (isSquare ? '12rem' : '10rem')};
  width: ${({ isSquare }) => (isSquare ? '12rem' : '13rem')};
  position: relative;
  margin: 0.5rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.primary.silver};

  button {
    position: absolute;
    top: 0;
    right: 0;
  }

  ${({ isSquare }) => mq('sm')`
    height: ${isSquare ? '13rem' : '12rem'};
    width: ${isSquare ? '13rem' : '16rem'};
  `}
`
