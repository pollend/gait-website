import React from 'react'
import Link from 'gatsby-link'
import logo from '../layouts/image/logo.png'

const Header = ({ siteTitle }) => (
  <div>
    <nav className={"navbar"} role={"navigation"} aria-label={"main","navigation"}>
      <div className={"navbar-brand"}>
        <img src={logo} style={{
          height: '50px',
          width:'100%'
        }}></img>
      </div>

      <div className={"navbar-menu"}>
        <div className={"navbar-start"}>

          <Link className={"navbar-item"} to="/">Home</Link>
          <Link className={"navbar-item"} to="/article">Blog</Link>
          <Link className={"navbar-item"} to="/research">Research</Link>
          <Link className={"navbar-item"} to="/members">Members</Link>
          <Link className={"navbar-item"} to="/publications">Publications</Link>
          <Link className={"navbar-item"} to="/positions">Open Lab Positions</Link>

        </div>

      </div>

    </nav>
  </div>
)

export default Header
