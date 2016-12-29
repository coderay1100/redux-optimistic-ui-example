import React, { Component } from 'react'
import { initStore, reducer } from '../store'
import { Provider } from 'react-redux'
import PromiseDemo from '../components/PromiseDemo'

class Index extends Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    const store = initStore(reducer, { message: 'Page Loaded 🤘🏻' }, isServer)
    return { initialState: store.getState(), isServer }
  }

  constructor(props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  render() {
    return (
      <Provider store={this.store}>
        <PromiseDemo />
      </Provider>
    )
  }
}

export default Index
