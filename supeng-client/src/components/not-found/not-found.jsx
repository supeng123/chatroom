import React, {Component}from "react"
import {Button} from "antd-mobile"

export default class NotFound extends Component {
    render() {
        return (<div>
                <h2>sorry, the page can not be found</h2>
                <Button type="primary" onClick={()=> this.props.history.replace("/")}>return</Button>
            </div>)
    }
}