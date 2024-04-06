import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
const Layout = ({search, setSearch, width}) => {
  return (
    <div className='App'>
    <Header title="React JS Blog"  width={width}/>
    <Nav search={search} setSearch={setSearch}/> 
    <Outlet />
<Footer />
    </div>
  )
}
export default Layout
//Outlet represent all other components that will be nested inside our layout