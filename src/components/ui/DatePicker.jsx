import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import PropTypes from 'prop-types'

import { styled } from '~app/styles/theme'

const DatePickerContainer = styled.div`
  .react-calendar {
    box-shadow: 0 0.2rem 2.3rem 0 ${({ theme }) => theme.colors.primary.endeavourWithOpacity};
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.primary.endeavourWithOpacity};

    abbr {
      color: ${({ theme }) => theme.colors.primary.black};
    }
  }

  .react-calendar__tile--active,
  .react-calendar__tile--hasActive,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.primary.endeavour} !important;

    abbr {
      font-weight: 700 !important;
      color: ${({ theme }) => theme.colors.primary.white};
    }
  }
`

const DatePicker = ({
  onDaysSelected, bookedDates, onNewMonth, setIsValidRange, shouldRestart,
}) => {
  const today = moment()

  const [selectedDays, setSelectedDays] = useState([today.toDate(), today.toDate()])

  const setInitState = () => {
    setSelectedDays([today.toDate(), today.toDate()])
  }

  useEffect(() => {
    if (shouldRestart) {
      setInitState()
    }
  }, [shouldRestart])

  const validateRange = (days) => {
    const start = moment(days[0]).startOf('day').toDate()
    const end = moment(days[1]).startOf('day').toDate()
    setSelectedDays([start, end])

    let isValid = true
    let dateToTest = moment(start)
    while (dateToTest.toDate().toString() !== end.toString()) {
      if (bookedDates.includes(dateToTest.toDate().toString())) {
        isValid = false
      } else {
        dateToTest = dateToTest.add(1, 'd').startOf('day')
      }
      if (!isValid) {
        dateToTest = moment(end)
      }
    }

    return isValid
  }

  const onChange = (days) => {
    if (days.length === 2) {
      const isValid = validateRange(days)
      setIsValidRange(isValid)
      onDaysSelected(days)
    }
  }

  const fetchMonthData = ({ action, activeStartDate, view }) => {
    // action --> prev, prev2, next, next2, drillUp, drillDown, onChange
    if (action !== 'drillUp' && action !== 'onChange' && view === 'month') {
      onNewMonth(activeStartDate)
    }
  }

  return (
    <DatePickerContainer>
      <Calendar
        minDate={today.toDate()}
        locale="en-US"
        onChange={onChange}
        onActiveStartDateChange={fetchMonthData}
        tileDisabled={({ date }) => bookedDates.includes(date.toString())}
        value={selectedDays}
        allowPartialRange
        selectRange
      />
    </DatePickerContainer>
  )
}

DatePicker.propTypes = {
  onDaysSelected: PropTypes.func.isRequired,
  bookedDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onNewMonth: PropTypes.func.isRequired,
  setIsValidRange: PropTypes.func.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
}

export default DatePicker
