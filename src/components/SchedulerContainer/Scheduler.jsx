import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
  BookingReview,
  BookingReviewContent,
  BookingReviewSpacer,
  NoValidRange,
  ScheduleContainer, ScheduleSelector, SelectorContainer,
} from './styles'
import Title from '~app/components/ui/Title'
import DatePicker from '~app/components/ui/DatePicker'
import { formatDate, jumpTo } from '~app/utils/utils'
import Button from '~app/components/ui/Button'
import { addDocument, getAgendaByBikeAndMonth } from '~app/lib/firebase/api'
import { bikeProps } from '~app/utils/props'
import { COLLECTIONS } from '~app/utils/constants'
import useFirebase from '~app/lib/firebase/client'
import UIactions from '~app/store/actions/ui'
import Confirmation from '../ui/Modal/Confirmation'

const Scheduler = ({ bikeData, isSchedulerOpen, closeScheduler }) => {
  const dispatch = useDispatch()
  const { user } = useFirebase()
  const [isValidRange, setIsValidRange] = useState(true)
  const [selectedDays, setSelectedDays] = useState([])
  const [bookedDates, setBookedDates] = useState([])
  const [showLoading, setShowLoading] = useState(false)
  const [showBookConfirmation, setShowBookConfirmation] = useState(false)

  const setInitState = () => {
    setIsValidRange(true)
    setSelectedDays([])
  }

  const getMonthAgenda = async (date = new Date()) => {
    const month = date.getMonth()
    const bikeId = bikeData.id

    const result = await getAgendaByBikeAndMonth(bikeId, month)
    const locked = []
    result.forEach((item) => {
      const start = moment(item.start.toDate())
      const end = moment(item.end.toDate())
      while (start.isSameOrBefore(end)) {
        locked.push(start.toDate().toString())
        start.add(1, 'd')
      }
    })
    setBookedDates(locked)
  }

  useEffect(() => {
    if (isSchedulerOpen) {
      setInitState()
      getMonthAgenda()
    }
  }, [isSchedulerOpen])

  const onDaysSelected = (days) => {
    setSelectedDays(days)
    setTimeout(() => jumpTo('booking-preview', 10), 400)
  }

  const bookNow = async () => {
    if (!user || !user.id) {
      dispatch(UIactions.setShowAuth({ showAuth: true }))
      return false
    }

    if (selectedDays && selectedDays.length === 2) {
      setShowLoading(true)

      const dataToSave = {
        user,
        bike: bikeData,
        start: new Date(moment(selectedDays[0]).format('YYYY/MM/DD 00:00:00')),
        end: new Date(moment(selectedDays[1]).format('YYYY/MM/DD 00:00:00')),
        month: selectedDays[0].getMonth(),
        createAt: new Date(),
        status: true,
      }

      await addDocument(COLLECTIONS.AGENDA, dataToSave)

      toast.success('You got it!', {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      setShowLoading(false)
      setInitState()
      closeScheduler()
    }

    return true
  }

  useEffect(() => {
    if (user && user.id) {
      bookNow()
    }
  }, [user])

  return (
    <ScheduleContainer>
      <div>
        <Title
          min={1.6}
          max={1.6}
          marginBottom="2rem"
        >
          Choose a Date
        </Title>
        <DatePicker
          onDaysSelected={onDaysSelected}
          bookedDates={bookedDates}
          onNewMonth={getMonthAgenda}
          setIsValidRange={setIsValidRange}
          shouldRestart={isSchedulerOpen}
        />
      </div>
      {
        selectedDays && selectedDays.length === 2 && (
          <SelectorContainer>
            <Title
              min={1.6}
              max={1.6}
              marginBottom="2rem"
              id="booking-preview"
            >
              Review Your Booking
            </Title>
            <ScheduleSelector>
              {
                !isValidRange
                  ? (
                    <NoValidRange>
                      The selected range is <strong>not valid</strong>,
                      please try again.
                      The locked days mean this bike is already booked
                      or not available.
                    </NoValidRange>
                  ) : (
                    <BookingReview>
                      <BookingReviewSpacer>
                        <BookingReviewContent>
                          <strong>Start:</strong>
                          <strong>End:</strong>
                        </BookingReviewContent>
                        <BookingReviewContent flexStart>
                          <span>{formatDate(selectedDays[0], 'ddd MM/DD/YYYY')}</span>
                          <span>{formatDate(selectedDays[1], 'ddd MM/DD/YYYY')}</span>
                        </BookingReviewContent>
                      </BookingReviewSpacer>
                      <Button
                        callback={() => setShowBookConfirmation(true)}
                        disabled={showLoading}
                        showLoader={showLoading}
                      >
                        Book Now
                      </Button>
                    </BookingReview>
                  )
              }
            </ScheduleSelector>
          </SelectorContainer>
        )
      }
      {
        showBookConfirmation && (
          <Confirmation
            type="blank"
            showConfirmation={showBookConfirmation}
            noLabel="No"
            yesLabel="Confirm"
            showLoader={showLoading}
            onClose={() => setShowBookConfirmation(false)}
            onYes={bookNow}
            buttonsMarginTop="2rem"
          >
            <Title
              marginBottom="1.2rem"
              textAlign="center"
              min={2}
              max={2}
            >
              Want to rent this bike?
            </Title>
          </Confirmation>
        )
      }
    </ScheduleContainer>
  )
}

Scheduler.propTypes = {
  bikeData: bikeProps.isRequired,
  isSchedulerOpen: PropTypes.bool.isRequired,
  closeScheduler: PropTypes.func.isRequired,
}

export default Scheduler
