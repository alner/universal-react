import uuid from 'node-uuid'
import dispatcher from '../dispatcher'

let listeners = []
let events = new Map()

export function getEvents() {
  return events
}

export function onChange(listener) {
  listeners.push(listener)
}

function addEvent(event) {
  event.id = uuid.v4()
  events.set(event.id, event)
  triggerListeners()
}

function removeEvent(id) {
  events.delete(id)
  triggerListeners()
}

function triggerListeners() {
  listeners.forEach(listener => {
    listener(events)
  })
}

dispatcher.register( payload => {
  let split = payload.type.split(':')
  if (split[0] === 'event') {
    switch(split[1]) {
      case 'add':
        addEvent(payload.event)
        break;

      case 'remove':
        removeEvent(payload.id)
        break;
    }
  }
})
