import dispatcher from '../dispatcher'

export function addEvent(event) {
  dispatcher.dispatch({
    event,
    type: 'event:add'
  })
}

export function removeEvent(event) {
  dispatcher.dispatch({
    event,
    type: 'event:remove'
  })
}
