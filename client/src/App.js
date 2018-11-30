import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';

import './App.css';

const url = process.env.REACT_APP_API_URL;


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      jokes: [],      
    };
  }

  authorize = () => {
    const token = localStorage.getItem('joke_token');
    const options = {
      headers: {
        Authorization: token,
      },
    };

    if(token) {
      axios.get(`${url}/api/jokes`, options)
        .then((res) => {
          if(res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/login');
        });
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.authorize();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if(pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authorize();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Client Side</h1>
        <nav>
          <NavLink to='/' className='nav-link'>Home</NavLink>
          <NavLink to='/login' className='nav-link'>Login</NavLink>
          <NavLink to='/register' className='nav-link'>Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/' render={() => {
              return(
                <React.Fragment>
                  <h2>Dad Jokes</h2>
                  <div>
                    {this.state.jokes.map(joke => <div key={joke.id} className='joke'><p>Setup:<br />{joke.setup}</p><p>Punchline:<br />{joke.punchline}</p></div>)}
                  </div>
                </React.Fragment>
              )
            }}></Route>
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
