import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const Header = Card.Header;
const Body = Card.Body;


class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props;
        return (
            <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                {
                    userList ? userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    thumb={require(`../../assets/images/${user.header}.jpg`)}
                                    extra={user.username} />
                                <Body>
                                    <div>position: {user.post}</div>
                                    <div>company: {user.company}</div>
                                    <div>salary: {user.salary}</div>
                                    {user.info ? <div>info: {user.info}</div> : null}
                                </Body>
                            </Card>
                        </div>
                    )) : null
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList);