import React from 'react'
import { auth, database } from '_firebase'

import Button from 'shared/button'
import Ledgers from 'components/app/ledgers'

export default class App extends React.Component {
  state = {
    data: null
  }
  componentDidMount () {
    database.ref().on('value', () => {})
  }
  signOut = () => {
    auth.signOut()
  }
  render () {
    return (
      <div className='container'>
        <div className='flex-between'>
          <div />
          <Ledgers />
          <Button
            onClick={this.signOut}
            icon='logout'
            ariaLabel='Cerrar Sesión'
          />
        </div>
        <div className='columns'>
          <div className='column'>Total</div>
        </div>
        <div className='columns'>
          <div className='column'>Me deben</div>
          <div className='column'>Input</div>
          <div className='column'>Debo</div>
        </div>
      </div>
    )
  }
}
