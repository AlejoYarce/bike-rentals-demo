import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const SideFiltersContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  min-width: 37rem;
  margin-top: ${({ marginTop }) => marginTop || 0};

  ${mq('md')`
    width: 22rem;
    min-width: 22rem;
    margin-right: 2rem;
  `}

  ${mq('lgs')`
    width: 100%;
    max-width: 22rem;
  `}
`
export const FiltersActionsMobile = styled.div`
  height: 4rem;
  width: calc(100% + 2rem);
  position: relative;
  top: -2rem;
  left: 0rem;  
  background-color: ${({ theme }) => theme.colors.primary.white};
  box-shadow: 0 0.2rem 2.3rem 0 ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;

  svg {
    height: 2.5rem;
    width: 2.5rem;
    margin-left: 0.5rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }
`
export const FiltersContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 1.5rem;
  border-top-left-radius: ${({ noTopRadius }) => (noTopRadius ? 0 : '1.5rem')};
  border-top-right-radius: ${({ noTopRadius }) => (noTopRadius ? 0 : '1.5rem')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FilterRow = styled.div`
  width: 100%;
  max-width: 35rem;
  margin-bottom: 1.2rem;
  padding: 0 0.5rem 0.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary.silver};
`
export const FilterRowAction = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-weight: 700;

  svg {
    height: 2rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }

  &:hover svg path {
    fill: ${({ theme }) => theme.colors.primary.endeavour};
  }
`
export const OptionsContainer = styled.div`
  font-size: 1.6rem;
  margin-top: 0.5rem;
  text-transform: capitalize;


  &#onlineServicesSelector {
    label {
      text-transform: initial;
    }
  }
`
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`
export const ColorFilter = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  background-color: ${({ color }) => color};
`
export const StarFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    height: 2rem;
    width: 2rem;
    margin-top: 0.2rem;

    path {
      fill: ${({ theme }) => theme.colors.primary.endeavour};
    }
  }
`
