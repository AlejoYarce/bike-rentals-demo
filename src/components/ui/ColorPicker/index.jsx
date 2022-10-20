import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import useOnclickOutside from 'react-cool-onclickoutside'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { ColorPickerContainer, ColorPreview, ColorPreviewContainer } from './styles'
import Title from '../Title'

const ColorPicker = ({ color, onColorChanged }) => {
  const [selectedColor, setSelectedColor] = useState(color)
  const [showPicker, setShowPicker] = useState(false)

  const onChangeComplete = (newColor) => {
    setSelectedColor(newColor?.hex || '')
    onColorChanged(newColor?.hex || '')
  }

  const ref = useOnclickOutside(() => {
    setShowPicker(false)
  })

  return (
    <div>
      <ColorPickerContainer>
        <Title
          textAlign="left"
          marginBottom="1rem"
          min={1.4}
          max={1.4}
        >
          Color <strong>*</strong>
        </Title>
        <ColorPreviewContainer onClick={() => setShowPicker(true)}>
          <ColorPreview selectedColor={selectedColor} />
          <p>{selectedColor}</p>
        </ColorPreviewContainer>
      </ColorPickerContainer>
      {
        showPicker && (
          <div ref={ref}>
            <TwitterPicker
              color={selectedColor}
              onChangeComplete={onChangeComplete}
              colors={['#FF0000', '#0000FF', '#00FF00', 'yellow', 'black', 'white', 'silver']}
            />
          </div>
        )
      }
    </div>
  )
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onColorChanged: PropTypes.func,
}

ColorPicker.defaultProps = {
  color: '',
  onColorChanged: noop,
}

export default ColorPicker
