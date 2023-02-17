import React, { Component } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import './style.css'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import Image from '../assets/images/pirsonal.png'
 

class Layout extends Component {

    state = {
      name : '',
      isAuth : true,
    }

    componentDidMount(){
      const user = JSON.parse(localStorage.getItem('gamerUser'))
      if(user) {
        this.setState({name : user.name})
      }
      else {
        this.setState({isAuth : false})
      }
    }

    render () {
      return (
        <div className='layout'>
          <Sidebar />
          <div className="right_side">
              <Navbar firstName={this.state.name} image={Image} logout={this.props.logout}  />
              <section className="content">
                <Outlet />
              </section>
          </div>
          {
            this.state.isAuth ? '' : <Navigate to='/login' />
          }
        </div>
      )
    }
  }

export default Layout
