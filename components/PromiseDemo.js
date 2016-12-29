import React from 'react'
import { connect } from 'react-redux'
import { getMessageAsync } from '../store'

const Demo = props => (
  <div>
    <h1>{props.message}</h1>
    <button
      onClick={() => { props.dispatch(getMessageAsync()) }}
    >Get Message</button>
    <button
      onClick={() => { props.dispatch(getMessageAsync(true)) }}
    >Get Rejected</button>
  </div>
)

export default connect(state => state)(Demo)
