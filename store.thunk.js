import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

export const reducer = (state, action) => {
  if (action.type === 'GET_MESSAGE_PENDING') {
    return {...state, message: 'Waiting for message 🤔'}
  } else if (action.type === 'GET_MESSAGE_FULFILLED') {
    return {...state, message: action.payload}
  } else if (action.type === 'GET_MESSAGE_REJECTED') {
    return {...state, message: action.payload}
  }
  return state
}

export const getMessageAsync = (rejectPlease = false) => {
  return (dispatch) => {
    // 1. Dispatch pending action
    dispatch({
      type: 'GET_MESSAGE_PENDING'
    })
    // 2. Fetch data
    setTimeout(() => {
      if (rejectPlease) {
        // 3a. Dispatch reject action
        dispatch({
          type: 'GET_MESSAGE_REJECTED',
          payload: 'Rejected 😭'
        })
      } else {
        // 3b. Dispatch fulfill action
        dispatch({
          type: 'GET_MESSAGE_FULFILLED',
          payload: 'Message from far away 👻'
        })
      }
    }, 1000)
  }
}

export const initStore = (reducer, initialState, isServer) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware(),
        loggerMiddleware()
      )
    )
  )
  if (isServer && typeof window === 'undefined') {
    return store
  } else {
    if (!window.store) {
      window.store = store
    }
    return window.store
  }
}