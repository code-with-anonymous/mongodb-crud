import React from 'react'
import Table from './Table'
import Users from './Users'
import AppHeader from '../../../components/Header'

export default function Index() {
  return (
    <>
    <AppHeader/>
    <main className='bg-img bg-dark'>
      <Users/>
      <Table/>
    </main>
    </>
  )
}
