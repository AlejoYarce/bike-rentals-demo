import { styled } from '~app/styles/theme'
import Button from '~app/components/ui/Button'

export const FieldContainer = styled.div`
  width: ${({ customWidth }) => customWidth || '100%'};
  display: flex;
  flex-direction: ${(props) => (props.showInlineLabel ? 'row' : 'column')};
  margin-bottom: ${(props) => props.marginBottom || '0.5rem'};
  margin-left: ${(props) => props.marginLeft || 0};
  margin-right: ${(props) => props.marginRight || 0};
  align-items: flex-end;
  position: relative;
`
export const InputLabel = styled.label`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 1.4rem;
  font-weight: 700;
  text-align: ${(props) => props.labelAlign || 'left'};
  display: ${({ hideLabel }) => (hideLabel ? 'none' : 'block')};

  strong {
    color: ${({ theme }) => theme.colors.primary.carnation};
    margin-left: 0.5rem;
  }
`
export const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary.silver};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary.black};
  background-color: ${({ theme }) => theme.colors.primarywhite};
  padding: 1rem 1.5rem;
  height: ${({ inputHeight }) => (inputHeight)}rem;
  text-align: ${(props) => props.textAlign || 'start'};
  text-transform: ${(props) => (props.capitalize ? 'capitalize' : 'none')};
  padding-left: ${({ moveIconToLeft }) => (moveIconToLeft ? '3.5rem' : '1.5rem')};

  &:focus {
    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary.endeavour};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.primary.silver};
  }
`
export const Hint = styled.p`
  color: ${({ theme }) => theme.colors.primary.carnation};
  font-size: 1.2rem;
  font-weight: 700;
  min-height: 2.6rem;
  margin: 0;
  line-height: 1.5;
  text-align: right;
`
export const InlineButton = styled(Button)`
  height: 2.4rem;
  position: absolute;
  top: 2.5rem;
  right: 1rem;

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`
export const CustomIconContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  position: absolute;
  top: ${({ hasLabel }) => (hasLabel ? '3.4rem' : '1.5rem')};
  right: ${({ moveIconToLeft }) => (moveIconToLeft ? 'unset' : '1.5rem')};
  left: ${({ moveIconToLeft }) => (moveIconToLeft ? '0' : 'unset')};

  svg {
    height: ${({ customIconHeight }) => customIconHeight};
    width: 2.5rem;
  }
`
export const CustomIconButton = styled(Button)`
  height: 5rem;
  width: 5rem;
  border-radius: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`
