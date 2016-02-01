import React, {Component} from 'react'
import Event from './event'

export default class EventList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
      {
        this.props.events.map((event, index) => {
          return <Event {...event} key={index} />
        })
      }
      </div>
    )
  }
}
