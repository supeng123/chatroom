import React, {Component} from 'react'
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import { directive, identifier } from '@babel/types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {NavBar} from "antd-mobile"

import {getRedirectTo} from '../../utils/util'
import {getUser} from '../../redux/actions.js'

import PeopleInfo from '../people-info/people-info';
import BossInfo from '../boss-info/boss-info';
import Boss from "../boss/boss"
import People from "../people/people"
import Message from "../message/message"
import Center from "../center/center"
import NotFound from "../../components/not-found/not-found"
import NavFooter from '../../components/nav-footer/nav-footer'

import Chat from '../chat/chat'


class Main extends Component {

    navList = [
        {
            path: '/boss',
            component: Boss,
            title: 'boss list',
            icon: 'boss',
            text: 'boss'
        },
        {
            path: '/people',
            component: People,
            title: 'peole list',
            icon: 'people',
            text: 'people'
        },
        {
            path: '/message',
            component: Message,
            title: 'Message list',
            icon: 'message',
            text: 'message'
        },
        {
            path: '/center',
            component: Center,
            title: 'Personal Center',
            icon: 'center',
            text: 'center'
        }
    ];
    
    filterList;
    

    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user;
        if(userid && !_id){
            this.props.getUser()
        }
    }

    render(){
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login'></Redirect>
        }

        const {user, location} = this.props;
        if(!user._id){
            return null;
        } else  {
            let path = location.pathname
            if(path === '/'){
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}></Redirect>
            }
            
        }
        
        const path = this.props.location.pathname
        const currentNav  = this.navList.find(nav => nav.path === path);

        if(currentNav) {
            if(user.type === 'boss'){
                this.navList[0].hide = true;
            }else if (user.type === 'people'){
                this.navList[1].hide = true;
            }
        }

        if(path === '/boss' && user.type === 'boss') {
            return <Redirect to='/people'></Redirect>
        } else if (path === '/people' && user.type === 'people') {
            return <Redirect to='/boss'></Redirect>
        }

        // debugger
        
        return (
            <div>
            {currentNav ? <NavBar>{currentNav.title}</NavBar>: null}
                <Switch>
                {
                    this.navList.map((nav, index) => <Route path={nav.path} component={nav.component} key={index} />)
                }
                    <Route path='/peopleinfo' component={PeopleInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={this.navList}></NavFooter>: null} 
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)
