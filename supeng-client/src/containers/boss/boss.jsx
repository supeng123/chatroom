import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/actions.js'
import UserList from '../../components/user-list/user-list';

class Boss extends Component{

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (
                <UserList userList={this.props.userList} />
            )
    }
}


export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Boss)