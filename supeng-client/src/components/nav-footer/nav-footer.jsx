import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item;

class NavFooter extends Component{

    static propTypes={
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }

    render() {
        let {navList, unReadCount} = this.props
        navList = navList.filter(nav => !nav.hide) 
        const path = this.props.location.pathname

        return(
            <TabBar>
            {navList? navList.map((nav) => 
                        <Item 
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                            title={nav.text}
                            key={nav.path}
                            selected={nav.path === path}
                            onPress={()=>{this.props.history.replace(nav.path)}}
                            />
                    ) : null
                    
                }
            
            </TabBar>
            )
    }
}

export default withRouter(NavFooter)