import React from 'react';
import '../App.css';
import { Container, Button } from 'react-bootstrap';
import { async } from 'q';
import Common from './common';
import * as firebase from 'firebase';
import { withRouter, Redirect, Route } from 'react-router-dom';
import ChatScreen from './chatScreen';






const Storage = new Common();




class Contacts extends React.Component {

    constructor() {
        super()
        this.state = {
            contacts: [],
            redirectFlag: false,
            messageFlag: false,
            contactName: ''
        }

    }

    async  componentDidMount() {
        this.setState({
            contacts: await Storage.getContact()
        })

        this.auth = firebase.auth();

        this.auth.onAuthStateChanged(firebase => {
            if (firebase) {
                console.log(firebase.email);

            }
            else {
                console.log('logged out')
            }
        })
    }



    logOutUser = () => {
        this.auth.signOut()
            .then(() => this.setState({ redirectFlag: true }))
    }



    render() {
        if (this.state.redirectFlag === true) {
            return (<Redirect to='/' />)
        }

        let { match } = this.props;
        return (

            this.state.contacts ?
                <Container key={Math.random()}>


                    <h3 className='m-3' style={{ color: 'blue' }}>Contacts</h3>

                    <Container className='d-flex justify-content-start' style={{ width: '100%' }}>
                        <div style={{ flexDirection: 'column', width: '100%' }}>
                            {this.state.contacts.map((x, i) =>

                                <Button style={{ width: '100%', borderRadius: 0, borderBottom: '1px #00000011 solid', fontSize: '1.2rem' }} className='m-0 py-3 btn-light' onClick={async () => {
                                    await this.setState({ messageFlag: true, contactName: x });

                                    this.props.history.push(`${match.url}/${this.state.contactName}`);
                                }}>{x}</Button>
                            )}
                        </div>
                    </Container>
                    <Button variant="primary" style={{ width: '100%', fontSize: '1.2rem' }} className='my-3 py-3' onClick={() => this.logOutUser()}>Logout</Button>


                </Container>
                : null

        );

    }

}

export default Contacts;
