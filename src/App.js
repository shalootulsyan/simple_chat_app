import React from 'react';
import './App.css';
import './screens/common.css';
import { Container } from 'react-bootstrap';
import Navs from './screens/nav';
import Login from './screens/login';
import SignUp from './screens/signUp';
import ChatScreen from './screens/chatScreen';
import Contacts from './screens/contacts';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
        <Container style={{ maxWidth: '30rem', boxShadow: 'rgba(0, 0, 0, 0.4) 1px 4px 6px 1px', minHeight: '25rem' }} className='bg-light d-flex flex-column justify-content-start align-items-center background py-5'>

          <Switch>
            <Route path='/' exact>
              <Redirect to='/signup' />
            </Route>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/login' exact component={Login} />
            <Route path='/contacts' exact component={Contacts} />
            <Route path={'/contacts/:value'} component={ChatScreen} />
            100vh

          </Switch>

        </Container>
      </div>
    </Router>
  );
}

export default App;
