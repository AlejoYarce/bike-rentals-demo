import { css } from '@emotion/react'
import { styled } from '~app/styles/theme'

const linkStyles = ({ theme }) => css`
  color: ${theme.colors.primary.black};
  background-color: transparent;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: underline;

  &:hover {
    color: ${theme.colors.primary.black};
    background-color: transparent;
  }
`
const disabledStyles = ({ theme }) => css`
  cursor: not-allowed;
  background-color: ${theme.colors.primary.silver};

  &:hover {
    background-color: ${theme.colors.primary.silver};
  }
`
const underlineStyles = () => css`
  text-decoration: underline !important;
`
const strokedStyles = ({ theme, strokedColor }) => css`
  border: ${`0.2rem solid ${strokedColor || theme.colors.primary.black}`};
  background-color: transparent;
  color: ${strokedColor || theme.colors.primary.black};

  &:hover {
    border: ${`0.2rem solid ${strokedColor || theme.colors.primary.black}`};
    background-color: ${strokedColor || theme.colors.primary.black};
  }
`
const loaderStyles = () => css`
  svg {
    margin-left: 1.5rem;
    animation: rotation 1s infinite linear;
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
`
const iconStyles = ({ theme }) => css`
  height: 3.4rem;
  width: 3.4rem;
  padding: 0;
  background-color: transparent;

  svg {
    height: 3.4rem;
    width: 3.4rem;

  path {
      fill: ${theme.colors.primary.black};
    }
  }

  &:hover {
    background-color: transparent;

    svg {
      path {
        fill: ${theme.colors.primary.black};
      }
    }
  }
`
export const CTAButton = styled.button`
  height: 4.5rem;
  width: 100%;
  max-width: 21rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.endeavour};
  border: none;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
  border-radius: 1rem;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.white};
    background-color: ${({ theme }) => theme.colors.primary.black};
    opacity: 1;
    border: none;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.white};
      }
    }
  }

  svg {
    height: 2.2rem;
    width: 2.2rem;
    animation: none;

    path {
      fill: ${({ theme }) => theme.colors.primary.white};
    }
  }

  ${({ customWidth }) => customWidth && css`
    width: ${customWidth};
    min-width: ${customWidth};
  `}
  ${({ link }) => link && linkStyles}
  ${({ icon }) => icon && iconStyles}
  ${({ stroked }) => stroked && strokedStyles}
  ${({ underline }) => underline && underlineStyles}
  ${({ showLoader }) => showLoader && loaderStyles}
  ${({ disabled }) => disabled && disabledStyles}
  ${({ customClass }) => customClass}
`

export default {}
