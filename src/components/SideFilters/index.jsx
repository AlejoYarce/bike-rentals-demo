import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@kunukn/react-collapse'

import { FiltersActionsMobile, SideFiltersContainer } from './styles'
import Title from '~app/components/ui/Title'
import FiltersForm from './FiltersForm'
import { useResize } from '../hooks/useResize'
import ChevronDown from '../ui/icons/ChevronDown'

const SideFilters = ({ meta, filterBikes, resetBikesList }) => {
  const { isMobile } = useResize()
  const [openFilters, setOpenFilters] = useState(false)

  return (
    <>
      {isMobile && (
        <FiltersActionsMobile onClick={() => setOpenFilters(!openFilters)}>
          {`${openFilters ? 'Close' : 'Show'} Filters`}
          <ChevronDown className={openFilters ? 'opened' : 'closed'} />
        </FiltersActionsMobile>
      )}
      {
        !isMobile
          ? (
            <SideFiltersContainer>
              <Title
                marginBottom="0.5rem"
                textAlign="left"
                min={1.6}
                max={2}
              >
                Filters
              </Title>
              <FiltersForm meta={meta} filterBikes={filterBikes} resetBikesList={resetBikesList} />
            </SideFiltersContainer>
          )
          : (
            <Collapse isOpen={openFilters} style={{ overflow: openFilters ? 'visible' : 'hidden' }}>
              <SideFiltersContainer marginTop="-2rem">
                <FiltersForm
                  meta={meta}
                  filterBikes={filterBikes}
                  resetBikesList={resetBikesList}
                  closeFilters={() => setOpenFilters(false)}
                />
              </SideFiltersContainer>
            </Collapse>
          )
      }
    </>
  )
}

SideFilters.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  resetBikesList: PropTypes.func.isRequired,
  filterBikes: PropTypes.func.isRequired,
}

export default SideFilters
