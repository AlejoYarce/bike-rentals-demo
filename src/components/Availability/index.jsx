import React, { useState } from 'react'
import moment from 'moment'

import Title from '~app/components/ui/Title'
import {
  Container, DayContainer, OpenStatus, RowContainer,
} from './styles'

const AvailabilityContainer = () => {
  const [availability] = useState({
    1: '07:00 am - 07:00 pm',
    2: '07:00 am - 07:00 pm',
    3: '07:00 am - 07:00 pm',
    4: '07:00 am - 07:00 pm',
    5: '07:00 am - 07:00 pm',
    6: '07:00 am - 07:00 pm',
    0: '07:00 am - 07:00 pm',
  })
  const [daysOfWeek] = useState([
    { key: 1, value: 'Mon' },
    { key: 2, value: 'Tue' },
    { key: 3, value: 'Wed' },
    { key: 4, value: 'Thu' },
    { key: 5, value: 'Fri' },
    { key: 6, value: 'Sat' },
    { key: 0, value: 'Sun' },
  ])

  const today = moment().day()

  return (
    <Container>
      <Title
        min={1.6}
        max={1.6}
        marginBottom="2rem"
        textAlign="center"
      >
        Availability
      </Title>
      {
        daysOfWeek.map((day) => (
          <RowContainer
            key={day.key}
            isOpen={availability[day.key]}
            isToday={day.key === today}
          >
            <DayContainer>
              <OpenStatus isOpen={availability[day.key]} />
              <span>{day.key === today ? 'Today' : day.value}</span>
            </DayContainer>
            <div>
              <span>{availability[day.key]}</span>
            </div>
          </RowContainer>
        ))
      }
    </Container>
  )
}

export default React.memo(AvailabilityContainer)
