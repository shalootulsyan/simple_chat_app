import React from 'react';
import '../App.css';
import { Container, Form, Button } from 'react-bootstrap';
import Navs from './nav';
import * as firebase from 'firebase';
import Common from './common';
import { withRouter, Redirect } from 'react-router-dom';

const Storage = new Common();



class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            redirectFlag: false,
            email: '',
            password: '',
        }
    }

    componentDidMount() {


        this.auth = firebase.auth();

        this.auth.onAuthStateChanged(firebase => {
            if (firebase) {
                console.log(firebase.email);

            }
            else {

            }
        })

    }

    logInUser = () => {

        this.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async () => {
                console.log('user created');

                const userName = Storage.getUserName()
                console.log(userName)
            }).then(() => this.setState({ redirectFlag: true }))
            .catch((err) => alert(err.message))
    }

    render() {
        if (this.state.redirectFlag === true) {
            return (<Redirect to='/contacts' />)
        }
        return (
            <div >
                <Navs />
                <Form className='' onSubmit={(e) => e.preventDefault()}>
                    <Form.Group controlId="Email" className='m-3'>
                        <Form.Control type="email" placeholder="Email" required onChange={async (event) => { await this.setState({ email: event.target.value }); }} />
                    </Form.Group>

                    <Form.Group controlId="Password" className='m-3'>
                        <Form.Control type="password" placeholder="Password" required onChange={async (event) => { await this.setState({ password: event.target.value }); }} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='m-3' onClick={() => this.logInUser()}>
                        Log In
</Button>
                </Form>
            </div>
        );
    }
}

export default Login;
