import React, { useState } from 'react'
import Collapse from '@kunukn/react-collapse'

import Title from '~app/components/ui/Title'
import ChevronDown from '~app/components/ui/icons/ChevronDown'
import {
  Container,
  Content,
  ScheduleBikeAction,
} from './styles'
import { bikeProps } from '~app/utils/props'
import Scheduler from './Scheduler'
import { jumpTo } from '~app/utils/utils'

const SchedulerContainer = ({ bikeData }) => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false)

  const openScheduler = () => {
    setIsSchedulerOpen(!isSchedulerOpen)
    setTimeout(() => jumpTo('book-this-bike', 10), 400)
  }

  return (
    <Container className="box-shadow">
      <ScheduleBikeAction onClick={openScheduler}>
        <Title
          textAlign="center"
          min={2.2}
          max={2.2}
          id="book-this-bike"
        >
          Book this Bike
        </Title>
        <ChevronDown className={isSchedulerOpen ? 'opened' : 'closed'} />
      </ScheduleBikeAction>
      <Collapse isOpen={isSchedulerOpen}>
        <Content>
          <Scheduler
            bikeData={bikeData}
            isSchedulerOpen={isSchedulerOpen}
            closeScheduler={() => setIsSchedulerOpen(false)}
          />
        </Content>
      </Collapse>
    </Container>
  )
}

SchedulerContainer.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default SchedulerContainer
