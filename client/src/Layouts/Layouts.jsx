import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Layouts = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layouts