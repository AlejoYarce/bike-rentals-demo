import React from 'react'

import { styled } from '~app/styles/theme'

const LoaderContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary.endeavour};
  background: ${({ theme }) => theme.colors.primary.endeavour};

  &:before, &:after {
    background: ${({ theme }) => theme.colors.primary.endeavour};
  }
`

const Loader = () => <LoaderContainer className="loader">Loading...</LoaderContainer>

export default Loader
