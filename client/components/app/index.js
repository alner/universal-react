import React, {Component} from 'react'
import './style.less'
import Hello from 'components/hello'
import EventsList from 'components/eventsList'

let events = [
  {
    name: 'Test event',
    description: 'Just description for test event'
  },
  {
    name: 'React event',
    description: 'Just another React event'
  },
  {
    name: 'Redux',
    description: 'Redux internals'
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <EventsList events={events} />
      </div>
    )
  }
}

export default App
