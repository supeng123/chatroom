import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item;

class NavFooter extends Component{

    static propTypes={
        navList: PropTypes.array.isRequired
    }

    render() {
        let {navList} = this.props
        navList = navList.filter(nav => !nav.hide) 
        const path = this.props.location.pathname

        return(
            <TabBar>
            {navList? navList.map((nav) => 
                        <Item 
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
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