import React from 'react';
import '../App.css';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function Navs() {
    return (
        <div >
            <Nav className='justify-content-space-around align-items-center' justify variant='tabs' >
                <Nav.Item className='m-4'>

                    <NavLink to='/signup' className="text-dark" activeStyle={{ color: 'black', textDecoration: 'underline' }} >SignUp</NavLink>

                </Nav.Item>

                <Nav.Item className='m-4'>

                    <NavLink to='/login' className="text-dark" activeStyle={{ color: 'blue', textDecoration: 'underline', }} >Login</NavLink>

                </Nav.Item>

            </Nav>
        </div>
    );
}

export default Navs;
