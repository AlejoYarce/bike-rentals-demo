import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Container, CustomArrowButton } from './styles'
import { theme } from '~app/styles/theme'
import PrevArrow from '~app/components/ui/icons/PrevArrow'
import NextArrow from '~app/components/ui/icons/NextArrow'

const CustomArrow = (props) => {
  const {
    className,
    style,
    onClick,
    isPrev,
    arrowsColor,
  } = props

  return (
    <CustomArrowButton
      className={className}
      style={{ ...style }}
      onClick={onClick}
      arrowsColor={arrowsColor}
      aria-label="slider arrow button"
    >
      {
        isPrev
          ? <PrevArrow />
          : <NextArrow />
      }
    </CustomArrowButton>
  )
}

CustomArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  onClick: PropTypes.func,
  isPrev: PropTypes.bool,
  arrowsColor: PropTypes.string,
}

CustomArrow.defaultProps = {
  className: '',
  style: {},
  onClick: noop,
  isPrev: false,
  arrowsColor: theme.colors.primary.black,
}

const SimpleSlider = (props) => {
  const {
    showArrows,
    showDots,
    infinite,
    speed,
    autoplaySpeed,
    autoplay,
    variableWidth,
    slidesToShow,
    arrowsColor,
    useCustomArrow,
    children,
    afterChange,
    fade,
  } = props

  const settings = {
    arrows: showArrows,
    dots: showDots,
    fade,
    infinite,
    speed,
    autoplaySpeed,
    autoplay,
    variableWidth,
    slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    prevArrow: useCustomArrow ? <CustomArrow isPrev arrowsColor={arrowsColor} /> : null,
    nextArrow: useCustomArrow ? <CustomArrow arrowsColor={arrowsColor} /> : null,
    afterChange,
  }

  return (
    <Container {...props}>
      <Slider {...settings}>
        {/*
        Required structure
        <div>
          <h3>1</h3>
        </div>
        */}
        {children}
      </Slider>
    </Container>
  )
}

SimpleSlider.propTypes = {
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
  infinite: PropTypes.bool,
  speed: PropTypes.number,
  autoplaySpeed: PropTypes.number,
  autoplay: PropTypes.bool,
  variableWidth: PropTypes.bool,
  slidesToShow: PropTypes.number,
  arrowsColor: PropTypes.string,
  useCustomArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  afterChange: PropTypes.func,
  fade: PropTypes.bool,
}

SimpleSlider.defaultProps = {
  showArrows: false,
  showDots: false,
  infinite: false,
  speed: 500,
  autoplaySpeed: 0,
  autoplay: false,
  variableWidth: false,
  slidesToShow: 1,
  arrowsColor: theme.colors.primary.black,
  useCustomArrow: false,
  afterChange: noop,
  fade: false,
}

export default SimpleSlider
