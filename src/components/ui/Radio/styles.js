import { styled } from '~app/styles/theme'

export const RadioLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 3rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input:checked ~ span {
    background-color: ${({ theme }) => theme.colors.primary.endeavour};
  }

  input:checked ~ span:after {
    display: block;
  }
`
export const Checkmark = styled.span`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 0.3rem;
  left: 0;
  border: 0.2rem solid ${({ theme }) => theme.colors.primary.endeavour};
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.primary.silver};
  background-color: ${({ theme }) => theme.colors.primary.white};

  &::after {
    height: 1.4rem;
    width: 0.8rem;
    content: "";
    position: absolute;
    left: 0.4rem;
    top: 0rem;
    border: solid ${({ theme }) => theme.colors.primary.white};
    border-width: 0 0.3rem 0.3rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`
export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`
