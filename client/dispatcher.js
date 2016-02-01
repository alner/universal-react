import uuid from 'node-uuid'

let listeners = new Map()

export function dispatch(payload) {
  for (let [id, listener] of listeners) {
    listener(payload)
  }
}

export function register(cb) {
  let id = uuid.v1()
  listeners.set(id, cb)
  return id
}

export function unregister(id) {
    return listeners.delete(id)
}
