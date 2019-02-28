import React, { Component } from "react"
import { Navbar, NavItem, Icon } from 'react-materialize'
import { Link } from 'react-router-dom';

class AppNavbar extends Component {

    render() {
        return (
            <Navbar brand='Etherswaps' right>
                    <NavItem> Connected Network: {this.props.network()} </NavItem>
                    <NavItem><Link to="/choose"> Getting started </Link></NavItem>
                    <NavItem><Link to="/createOffer">Create an Offer </Link></NavItem>
                    <NavItem><NavItem><Link to="/market"><Icon>view_module</Icon></Link></NavItem></NavItem>
            </Navbar>
        )
    }
}

export default AppNavbar