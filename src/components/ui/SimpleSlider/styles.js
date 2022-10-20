import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const Container = styled.div`
  height: ${(props) => props.height || '25rem'};
  width: 100%;

  .slick-track {
    opacity: 1;
  }

  .slick-dots {
    bottom: 1.5rem;
    background-color: transparent;

    & li button {
      border-radius: 50%;

      &:hover {
        &:before {
          opacity: 1;
        }
      }

      &:before {
        font-size: 5rem;
      }
    }

    & li.slick-active button:before {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }

  .slick-prev {
    z-index: 1;
    left: 0.5rem;

    svg {
      position: relative;
      top: 0;
      left: 0.2rem;
    }

    ${mq('md')`
      left: 1rem;
    `};
  }

  .slick-next {
    z-index: 1;
    right: 0.5rem;

    svg {
      position: relative;
      top: 0;
      left: 0.8rem;
    }
    
    ${mq('md')`
      right: 1rem;
    `}
  }

  .slick-arrow::before {
    color: ${({ arrowsColor, theme }) => arrowsColor || theme.colors.primary.black};
  }
`

export const CustomArrowButton = styled.button`
  height: 3.5rem;
  width: 3.5rem;
  display: block;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 50%;

  svg {
    height: 2.5rem;

    path {
      stroke: ${({ arrowsColor, theme }) => arrowsColor || theme.colors.primary.black};
    }
  }

  &:focus {
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.primary.white};
  }

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.primary.white};

    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary.black};
      }
    }
  }

  &::before {
    content: '';
    display: none;
  }
`
