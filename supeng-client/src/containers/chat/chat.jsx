import { statement } from "@babel/template";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile';
import {sendMsg, readMsg} from '../../redux/actions.js';

const Item = List.Item;

class Chat extends Component{

    state = {
        content: '',
        isShow: false
    }

    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        
        if(content) {
            this.props.sendMsg({from, to, content});
        }

        this.setState({
            content: '',
            isShow: false
        })
    }

    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    componentWillMount() {
        const emojis = ['😃', '😄', '😁', '😆', '😅', '😂', '😇', '😉', '😘', '😋', '😃', '😄', '😁', '😆', '😅', '😂','😃', '😄', '😁', '😆', '😅', '😂', '😇', '😉', '😘', '😋', '😇', '😉', '😘', '😋','😃', '😄', '😁', '😆', '😅', '😂', '😇', '😉', '😘', '😋'];
        this.emojis = emojis.map((emoji) => ({text: emoji}));
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)

        //update already read msg
        const targetId = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(targetId, to)
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        //update already read msg
        const targetId = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(targetId, to)
    }

    render() {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        const meId = user._id
        if (!users[meId]) {
            return null;
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')

        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.jpg`) : null;

        const meHeader = users[meId].header
        const meIcon = meHeader ? require(`../../assets/images/${meHeader}.jpg`) : null;


        return (
            <div id='chat-page'>
                <NavBar onLeftClick={() => this.props.history.goBack()} className='sticky-header' icon={<Icon type='left' />}>
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {
                        msgs.map(msg => {
                            if(targetId === msg.from) {
                                return (
                                    <Item thumb={targetIcon}  key={msg._id}>
                                    {msg.content}
                                    </Item>
                                )
                            } else {
                                return (
                                    <Item thumb={meIcon} className='chat-me' key={msg._id}>
                                    {msg.content}
                                    </Item>)
                            }
                        })
                    }
                    
                </List>
                <div className="am-tab-bar">
                    <InputItem
                        placeholder="please enter something"
                        value = {this.state.content}
                        onChange = {value => this.setState({content: value})}
                        onFocus = {() => this.setState({isShow:false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow}>😄</span>
                                <span onClick={this.handleSend}>send</span>
                            </span> 
                        }
                        />
                        {this.state.isShow ? (<Grid
                            data = {this.emojis}
                            columnNum = {8}
                            carouselMaxRow = {4}
                            isCarousel = {true}
                            onClick = {(item) => {this .setState({content: this.state.content + item.text})}}
                        />) : null}
                        
                </div>
            </div>
            )
    }
}


export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)