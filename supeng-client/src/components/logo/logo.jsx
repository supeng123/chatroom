import React from 'react'
import logo from '../../assets/logo.jpg'
import './logo.less'

export default function Logo(){
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img" />
        </div>)
}