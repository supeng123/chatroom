import React,{Component} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    login = () => {
        this.props.login(this.state)
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {type} = this.state;
        const {msg, redirectTo} = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo}></Redirect>
        }

        return (
            <div>
                <NavBar>deserve to buy</NavBar>
                <Logo />
                <WingBlank>
                    {msg ? <div className="error-msg">{msg}</div> : null}
                    <List>
                        <InputItem placeholder="please enter username" onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem placeholder="please enter password"type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
                        <WhiteSpace></WhiteSpace>
                    
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.login}>Login</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toRegister}>Go to register</Button>
                    </List>  
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login);