import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = styled.nav`
background-color: rgba(0, 0, 0, .85);
-webkit-backdrop-filter: saturate(180%) blur(20px);
backdrop-filter: saturate(180%) blur(20px);
`
const StyledLink = styled(Link)`
font-size: 20px;
color: #999;
transition: ease-in-out color .15s;
&:hover {
  color: #fff;
  text-decoration: none;
}
`

const Nav = () => {
    return (
      <Navbar className="py-1">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <StyledLink to="/Dashboard">Dashboard</StyledLink>
        </div>
      </Navbar>)
    }

export default Nav