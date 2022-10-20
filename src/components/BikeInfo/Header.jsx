import React from 'react'

import {
  HeaderContainer, ImageContainer, InlineContainer, Location, SliderContainer,
} from './styles'
import Title from '~app/components/ui/Title'
import { theme } from '~app/styles/theme'
import { bikeProps } from '~app/utils/props'
import Rating from '~app/components/Reviews/Rating'
import SimpleSlider from '~app/components/ui/SimpleSlider'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'
import { useResize } from '~app/components/hooks/useResize'

const Header = ({ bikeData }) => {
  const {
    model,
    images,
    reviews,
    location,
  } = bikeData

  const { isMobile } = useResize()

  return (
    <HeaderContainer>
      <InlineContainer>
        <Location>{location}</Location>
      </InlineContainer>
      <InlineContainer>
        <Title
          textAlign="left"
          color={theme.colors.primary.white}
          max={3}
          capitalize
        >
          {model}
        </Title>
        {reviews && (
          <Rating
            value={reviews.avg}
            reviews={reviews ? reviews.qty : 0}
            fontColor={theme.colors.primary.white}
            activeColor={theme.colors.primary.white}
            emptyColor={`${theme.colors.primary.silver}30`}
            showAvg
          />
        )}
      </InlineContainer>
      <SliderContainer className="box-shadow">
        <SimpleSlider
          arrowsColor={theme.colors.primary.black}
          slidesToShow={isMobile || images?.length === 1 ? 1 : 2}
          height="100%"
          useCustomArrow
          showArrows
          showDots
          infinite
        >
          {
            images?.map((image, index) => (
              <div key={index}>
                <ImageContainer isOnlyOne={images?.length === 1}>
                  <ResponsiveImage publicId={image} maxWidth={880} />
                </ImageContainer>
              </div>
            ))
          }
        </SimpleSlider>
      </SliderContainer>
    </HeaderContainer>
  )
}

Header.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default Header
