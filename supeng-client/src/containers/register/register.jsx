import React,{Component} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'boss'
    }

    register = () => {
        console.log(this.props);
        this.props.register(this.state)
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
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
                        <InputItem placeholder="please enter password"type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm Password:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <ListItem>
                            <span>User type:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>Boss</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'people'} onChange={() => this.handleChange('type', 'people')}>People</Radio>
                        </ListItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.register}>Register</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toLogin}>Login</Button>
                    </List>  
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register);
