import { styled } from '~app/styles/theme'

export const ColorPickerContainer = styled.div`
  margin-bottom: 3rem;

  h1 {
    strong {
      color: ${({ theme }) => theme.colors.primary.carnation};
    }
  }
`
export const ColorPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    margin-left: 1rem;
  }
`
export const ColorPreview = styled.div`
  height: 3rem;
  width: 4rem;
  background-color: ${({ selectedColor, theme }) => selectedColor || theme.colors.primary.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.primary.silver};
  border-radius: 0.5rem;
  text-transform: uppercase;
`
