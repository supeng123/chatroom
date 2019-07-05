import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button,} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';
import {update} from '../../redux/actions'

class PeopleInfo extends Component {

    state = {
        header: '',
        post: '',
        info: ''
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
            const path = type==='people' ? '/boss' : '/people'
            return <Redirect to={path}></Redirect>
        }

        return (
            <div>
                <NavBar>People info completion</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder="please enter the position" onChange={val => this.handleChange('post', val)}>application possition: </InputItem>
                <InputItem placeholder="introduction" onChange={val => this.handleChange('info', val)}>self introduction: </InputItem>
                <Button type="primary" onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {update}
)(PeopleInfo)