import { styled } from '~app/styles/theme'

export const Content = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
`
export const LogoImg = styled.div`
  height: 8rem;
  width: 8rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
export const ErrorMessage = styled.p`
  height: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.carnation};
  font-weight: 700;
  font-size: 1.4rem;
  margin-top: 0.6rem;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1.2rem'};
`
export const Separator = styled.p`
  color: ${({ color, theme }) => color || theme.colors.primary.endeavour};
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  margin-top: ${({ marginTop }) => marginTop || 0};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`
export const SocialContainer = styled.div`
  width: 13rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;

  button {
    height: 5rem;
    width: 5rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.primary.black};
    border-radius: 3rem;
    padding: 0.6rem;
    background-color: ${({ theme }) => theme.colors.primary.white};

    &:hover {
      border: 0.2rem solid ${({ theme }) => theme.colors.primary.black};
    }
  }
`
export const InlineLink = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: flex-end;

  button {
    color: ${({ theme }) => theme.colors.primary.black};
    border-bottom: 0.1rem solid transparent;
  
    &:hover {
      color: ${({ theme }) => theme.colors.primary.black};
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary.black};
    }
  }
`
export const OtherOptions = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const CustomA = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.black};
  margin-top: 1rem !important;

  &:hover {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary.black} !important;
  }
`
