import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class Alerts extends Component {
    static propTypes = {
        response: PropTypes.object.isRequired
    }
    componentDidUpdate(prevProps) {
        const { response, alert } = this.props
        const addMessage = "LEAD ADDED"
        const deleteMessage = "LEAD DELETED"
        if(response !== prevProps.response){
            if(response.msg.name){
                alert.error(`Name: ${response.msg.name.join()}`)
            }
            if(response.msg.email){
                alert.error(`Email: ${response.msg.email.join()}`)
                
            }
            if(response.msg.message){
                alert.error(`Message: ${response.msg.message.join()}`)
                
            }
            if(response.msg === addMessage){
                alert.success(response.msg)
            }
            if(response.msg === deleteMessage){
                alert.success(response.msg)
            }
        }
    }
    render() {
        return (<Fragment />)
    }
}

const mapStateToProps = state =>({
    response: state.alerts
})

export default connect(mapStateToProps)(withAlert()(Alerts));
