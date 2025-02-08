import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../ui/Header'
import Footer from '../ui/Footer'

const Layout = () => {
  return (
    <>
        <Header />
            <Outlet />
        <Footer />
    </>
  )
}

export default Layout