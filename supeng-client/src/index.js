import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd-mobile'
import {Provider} from 'react-redux'

import {HashRouter, Route, Switch} from 'react-router-dom'

import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

import './assets/css/index.less'

// import './socket/socket';
// import{ initIO } from './redux/actions'
// initIO()


ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
   </Provider>
    ), document.getElementById('root'))