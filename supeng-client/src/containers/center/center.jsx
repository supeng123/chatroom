import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
import {resetUser} from '../../redux/actions.js'

const Item = List.Item;
const Brief = Item.Brief;

class Center extends Component {

    logout = () => {
        Modal.alert('logout', 'are you sure going to logout?', [
            {
                text: 'cancel',
                onPress: () => console.log('cancel')    
            },
            {
                text: 'confirm',
                onPress: () => {
                    Cookies.remove('userid');
                    this.props.resetUser();
                }
            }
        ])
    }

    render() {
        const {username, info, header, company, post, salary} = this.props.user;

        return (
            <div>
                <Result 
                    img={<img src={require(`../../assets/images/1.jpg`)} style={{width: 50}} alt="header" />} 
                    title={username}
                    message={company}
                    />
                
                <List renderHeader={() => 'related info'}>
                    <Item multipleLine>
                        <Brief>position: {post}</Brief>
                        <Brief>proforlio: {info}</Brief>
                        <Brief>salary: {salary}</Brief>
                    </Item>
                </List>

                <WhiteSpace></WhiteSpace>

                <List>
                    <Button type="warning" onClick={this.logout}>Log out</Button>
                </List>
            </div>
        )
    } 
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Center)