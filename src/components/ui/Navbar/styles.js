import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const NavBarContainer = styled.nav`
  height: ${({ theme }) => theme.heights.navbarSm}rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.black};
  z-index: ${({ theme }) => theme.zIndex.navBar};
  position: absolute;
  left: 0;
  top: 0;

  ${({ theme }) => mq('md')`
    height: ${theme.heights.navbar}rem;
  `}
`
export const NavBarContent = styled.div`
  height: ${({ theme }) => theme.heights.navbarSm}rem;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.white};
  padding: 0 1rem;
  position: relative;

  ${({ theme }) => mq('md')`
    height: ${theme.heights.navbar}rem;
  `}
`
export const NavBarLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.4rem;
  cursor: pointer;

  svg {
    height: 3.2rem;
    margin-right: 1.2rem;
  }

  ${({ theme }) => mq('md')`
    height: ${theme.heights.navbar}rem;
    font-size: 2.8rem;

    svg {
      height: 3.6rem;
    }
  `}
`
export const NavBarLogin = styled.div`
  display: flex;
  cursor: pointer;

  svg {
    height: 2.4rem;
  }
`
export const FloatingMenuContainer = styled.div`
  width: 15rem;
  position: absolute;
  top: ${({ theme }) => `calc(${theme.heights.navbar}rem - 1.5rem)`};
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.white};

  ${({ theme }) => mq('md')`
    top: ${`calc(${theme.heights.navbar}rem - 1.2rem)`};
  `}
`
export const FloatingMenuItem = styled.div`
  height: 4rem;
  width: 100%;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary.black};
  border: 0.1rem solid ${({ theme }) => theme.colors.primary.silver};
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.endeavour};
    color: ${({ theme }) => theme.colors.primary.white};
    font-weight: 700;
  }
`
