import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button,} from 'antd-mobile';

import {update} from '../../redux/actions'
import HeaderSelector from '../../components/header-selector/header-selector'

class BossInfo extends Component {

    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    save = () => {
        console.log(this.state)
        this.props.update(this.state)
    }
    
    render() {
        const {header, type} = this.props.user
        if (header) {
            const path = type==='boss' ? '/people' : '/boss'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>Boss info completion</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="please enter the position" onChange={val => this.handleChange('post', val)}>recruitment possition: </InputItem>
                <InputItem placeholder="please enter firm name"  onChange={val => this.handleChange('company', val)}>firm name: </InputItem>
                <InputItem placeholder="please enter salary"  onChange={val => this.handleChange('salary', val)}>salary: </InputItem>
                <TextareaItem title="Job requirement:" rows={3}  onChange={val => this.handleChange('info', val)}></TextareaItem>
                <Button type="primary" onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {update}
)(BossInfo)