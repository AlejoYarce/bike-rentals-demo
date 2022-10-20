import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const CustomTitle = styled.h1`
  color: ${({ color, theme }) => color || theme.colors.primary.black};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  margin-top: ${({ marginTop }) => marginTop || '0rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0rem'};
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  font-size: ${({ min }) => `${min}rem`};

  ${({ max }) => mq('md')`
    font-size: ${max}rem};
  `}
`

export default {}
