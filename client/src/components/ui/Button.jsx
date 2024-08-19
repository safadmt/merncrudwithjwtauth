import { Component } from "react";

export default class Button extends Component {
    render () {
        const {className,label,type} = this.props

        return <button 
        type={type}
         
        onClick={this.props.handleClick} 
        className={`px-4 py-2 mt-2 ${className}`}>{label}</button>
    }
}