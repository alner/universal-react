import uuid from 'node-uuid'
import * as dispatcher from 'dispatcher/index'

let listeners = []
let events = new Map([
  [1, {id: 1, name: 'Test', description: 'Test description'}],
  [2, {id: 2, name: 'React', description: 'Learn React'}],
  [3, {id: 3, name: 'Yes, Redux!', description: 'Try Redux'}]
])

export function getEvents() {
  let data = []
  for (let item of events.values())
    data.push(item)

  return data
}

export function addListener(listener) {
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
    listener(getEvents())
  })
}

dispatcher.register((payload) => {
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
