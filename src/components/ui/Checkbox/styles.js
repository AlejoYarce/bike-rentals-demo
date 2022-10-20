import { styled } from '~app/styles/theme'

export const CheckboxLabel = styled.label`
  width: ${({ customWidth }) => customWidth || '100%'};
  display: block;
  position: relative;
  padding-left: 3rem;
  margin-bottom: ${(props) => props.marginBottom};
  position: relative;
  cursor: pointer;
  user-select: none;
  text-align: left;
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary.endeavour};
  }
`
export const CheckboxInput = styled.input`
  height: 0;
  width: 0;
  position: absolute;
  opacity: 0;
  cursor: pointer;
`
export const Checkmark = styled.span`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: -0.1rem;
  left: 0;
  border: 0.2rem solid ${({ theme }) => theme.colors.primary.endeavour};
  border-radius: 0.3rem;
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
