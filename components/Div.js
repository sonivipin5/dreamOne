import React from 'react'
import Navbar from './Navbar'

const Div = ({children}) => {
  return (
    <div>
      <Navbar/>
      <div className='container m-auto'>{children}</div>
    </div>
  )
}

export default Div
