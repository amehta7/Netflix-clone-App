import React from 'react'

const NotAvailable = ({ name }) => {
  return (
    <h1 className='not-available'>
      {`No ${name} avaialble for the selected genre. Please select a different
      genre.`}
    </h1>
  )
}

export default NotAvailable
