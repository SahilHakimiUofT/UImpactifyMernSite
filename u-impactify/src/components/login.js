import React, { Component } from 'react'
import Footer from './footer.component'
import NavBarHome from './navbarhome.component'

export default class login extends Component {
    state = {
        email: '',
        password: '',
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render()
    {
        return (
            <div className="main-login">
                <NavBarHome />
                <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div> 
                    <br />
                    <div className="input-field">
                        <label htmlFor="password">password</label>
                        <br />
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div> 
                    <br />
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="username" id="username" onChange={this.handleChange}/>
                    </div> 
                    <div className="input-field">
                        <button className="btn pink">Login</button>
                    </div>
                </form>
                </div>
                <Footer />
            </div>
        )
    }
}

