import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const DashboardPagesContainer = styled.div`
  width: 100%;
  max-width: 144rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  ${mq('lg')`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  `}
`
export const DataContainer = styled.div`
  width: 100%;
  max-width: 85rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  button {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.endeavour};
      }
    }
  }
`
export const ManageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  button {
    height: 3.2rem;
  }
`
export const ChildContainer = styled.div`
  width: 100%;
`
export const ImageContainer = styled.div`
  height: 70%;
  border-radius: 1.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
  cursor: pointer;

  img {
    border-radius: 1.5rem;
  }

  ${mq('lg')`
    height: 90%;
  `}
`
export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  button {
    max-width: 3.2rem;

    svg {
      height: 2.2rem;
      width: 2.2rem;
    }
  }

  button.star {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.goldenTainoi};
      }
    }
  }

  button.delete {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.carnation};
      }
    }
  }

  ${mq('md')`
    button {
      max-width: 3.4rem;

      svg {
        height: 2.4rem;
        width: 2.4rem;
      }
    }
  `}
`
export const CreatorContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.white};
  font-size: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`
export const FormContainer = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const FormContainerRow = styled.div`
  width: ${({ customWidth }) => customWidth || '100%'};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0};

  ${mq('md')`
    flex-direction: row;
    justify-content: space-between;
  `}
`
export const ImagesContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  ${mq('md')`
    margin-top: 0;
  `}
`
export const ColorPreview = styled.div`
  background-color: ${({ color }) => color};
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
`
