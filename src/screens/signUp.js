import React from 'react';
import '../App.css';
import { Container, Form, Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { withRouter, Redirect } from 'react-router-dom';
import Navs from './nav';
import Common from './common';



const Storage = new Common();





class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            email: '',
            password: '',
            redirectFlag: false

        }
    }
    async componentDidMount() {

        this.auth = firebase.auth();
        this.auth.onAuthStateChanged(firebase => {
            if (firebase) {
                console.log(firebase.email);
                console.log(firebase);

            }
            else {
                console.log('logged out')
            }
        })


    }

    createuser = () => {
        this.auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async () => {
                console.log('user created');

                await Storage.setUserName(this.state.userName)
                await Storage.setContact()
                await Storage.setInitialMessage()
            }).then(() => this.auth.currentUser.updateProfile({
                displayName: this.state.userName
            })).then(() => this.setState({ redirectFlag: true }))
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
                    <Form.Group controlId="UserName" className='m-3'>
                        <Form.Control placeholder="UserName" required onChange={(event) => this.setState({ userName: event.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="Email" className='m-3'>
                        <Form.Control type="email" placeholder="Email" required onChange={(event) => this.setState({ email: event.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="Password" className='m-3'>
                        <Form.Control type="password" placeholder="Password" required onChange={(event) => this.setState({ password: event.target.value })} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='m-3' onClick={() => this.createuser()}>
                        Create An Account
  </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(SignUp);
