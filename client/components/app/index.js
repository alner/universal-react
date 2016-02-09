import React, {Component} from 'react'
import './style.less'
import EventsList from 'components/eventsList'
import * as EventsStore from 'stores/eventsStore'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: EventsStore.getEvents()
    }
  }

  componentDidMount() {
    EventsStore.addListener((events) => {
      this.setState({events});
    });
  }

  render() {
    return (
      <div>
        <EventsList events={this.state.events} />
      </div>
    )
  }
}

export default App
