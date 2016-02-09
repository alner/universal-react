import React, {Component} from 'react'

export default class Event extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { id, name, description } = this.props;
    return (
    <div>
      <h1>{id}:{name}</h1>
      <div>{description}</div>
    </div>
    )
  }
}
