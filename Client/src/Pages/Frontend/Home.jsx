import React from 'react'
import { useAuthContext } from '../../context/userContext'

function Home() {
  const {token ,user} =useAuthContext()
  console.log('user', user);
  console.log('token', token)
  return (
    <h1 className='text-center mt-5'>Home</h1>
  )
}

export default Home