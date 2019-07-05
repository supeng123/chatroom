import React, {Component} from 'react';

import {List, Grid} from 'antd-mobile';

import PropTypes from 'prop-types';

export default class HeaderSelector extends Component {

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon:null
    }
    

    constructor(props) {
        super(props)

        this.headerList = [];
        for (let i = 0; i < 7; i++) {
            this.headerList.push({
                text: 'profile'+(i + 1),
                icon: require(`../../assets/images/${i+1}.jpg`)
            })
        }
    }

    handClick = ({text, icon}) => {
        this.setState({icon})
        this.props.setHeader(text.slice(-1))
    }

    render () {
        const listHeader = this.state.icon ? (<div>chosen image:<img src={this.state.icon}/></div>): 'please set you profile image';

        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} columnNum={3} onClick={this.handClick}>
                
                </Grid>
            </List>
        )
    }
}