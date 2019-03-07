import React, { Component } from "react"
import { Navbar, NavItem, Icon } from 'react-materialize'
import { Link } from 'react-router-dom';
import {LogoGreen} from '../styles/index'
class AppNavbar extends Component {

    render() {
        const Logo = <img src={LogoGreen} alt="Logo"/>
        return (
            <Navbar brand={Logo} right>
                    <NavItem> Connected Network: {this.props.network()} </NavItem>
                    <NavItem><Link to="/choose"> Getting started </Link></NavItem>
                    <NavItem><Link to="/createOffer">Create an Offer </Link></NavItem>
                    <NavItem><NavItem><Link to="/market"><Icon>view_module</Icon></Link></NavItem></NavItem>
            </Navbar>
        )
    }
}

export default AppNavbar