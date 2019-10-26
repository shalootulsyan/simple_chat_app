import React from 'react';
import '../App.css';
import './chatScreen.css';
import { Container, Button } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import Navs from './nav';
import Common from './common';

const Storage = new Common();

const pollingMessage = [
    'hi',
    'hello',
    'no worries',
    'hi',
    'hello',
    'no worries',
    'hi',
    'hello',
    'no worries',
]



class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            redirectFlag: false,
            text: [],
            inputText: '',
            count: 0,
            userName: '',
            messageData: []

        }
    }
    async componentDidMount() {
        const { value } = this.props.match.params;
        this.setState({ userName: value })
        //console.log(value);

        await this.setState({
            messageData: await Storage.getMessage()
        })
        //console.log(this.state.messageData[this.state.userName].message);

        await this.setState({ text: [...this.state.messageData[this.state.userName].message, ...this.state.text] })
        await this.setState({
            messageData: {
                ...this.state.messageData,
                [this.state.userName]: this.state.text
            }
        })

        this.timer = setInterval(() => {
            this.polling()
        }, 2000);

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    polling = async () => {
        let item = pollingMessage[this.state.count];

        await this.setState({ text: [...this.state.text, { message: item, from: 'other' }], count: this.state.count >= pollingMessage.length - 1 ? 0 : this.state.count + 1, });
        await this.setState({
            messageData: {
                ...this.state.messageData,
                [this.state.userName]: {
                    message: this.state.text,
                    name: this.state.userName
                }
            }
        })

        await Storage.setMessage(this.state.messageData);
        this.divElement.scrollTo(0, this.divElement.scrollHeight || 0)

    }

    textInputHandle = async () => {
        await this.setState({ text: [...this.state.text, { message: this.state.inputText, from: 'me', }], });
        this.divElement.scrollTo(0, this.divElement.scrollHeight)

        if (this.state.inputText)
            this.setState({ inputText: '' })

    }







    goback = () => {
        this.setState({
            redirectFlag: true
        })
    }
    render() {
        if (this.state.redirectFlag) {
            return <Redirect to='/contacts' />
        }

        return (
            <>
                <Container className='d-flex flex-row justify-content-between m-0 p-0'>
                    <h3>{this.state.userName}</h3>
                    <Button variant="primary" className='m-3' onClick={() => this.goback()} className=''>{'<-- Go Back'}</Button>
                </Container>
                <Container id="chatBox" style={{ height: '70vh' }} ref={(divElement) => this.divElement = divElement}>
                    <div className="fix"></div>
                    {this.state.text.map(data => data.from == 'other' ? <div className="alert alert-success mr-5">{data.message}</div> : <div className="alert alert-danger ml-5">{data.message}</div>)}

                </Container>

                <Container className='d-flex justify-content-between align-items-end my-2 ' style={{}}>
                    <input style={{ paddingLeft: 5, width: '100%', height: '50px', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} className='' value={this.state.inputText} type='text' onChange={async (event) => { await this.setState({ inputText: event.target.value }); }} placeholder={'Type a message'} value={this.state.inputText} />
                    <Button variant="primary" style={{ borderRadius: 0, height: '50px', borderTopRightRadius: 8, borderBottomRightRadius: 8 }} className='m-3' onClick={() => this.textInputHandle()} className=''>{'Send'}</Button>
                </Container>
            </>



        );
    }
}

export default ChatScreen;
