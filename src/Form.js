import React, { Component } from 'react';
import './Form.css'

function isEmailValide(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}
class Form extends Component {
    constructor() {
        super();
        this.state = {
            accountId: "",
            accountIdError: "",
            password: "",
            passwordError: "",
            cfmPassword: "",
            cfmPasswordError: "",
            isSubmit: false,
            passwordType:"password",
            cfmPasswordType:"password",
            
        }


        this.hints = [
            { typo: '.con', correction: '.com' },
            { typo: '.met', correction: '.net' },
            { typo: '@yaho.com', correction: '@yahoo.com' },
            { typo: '@gamil.com', correction: '@gmail.com' }
        ]
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.show = this.show.bind(this);
        //this.validate = this.validate.bind(this);
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    show(e){
        this.setState({
            [e.target.name]:"text",
        })
    }
    validate() {
        let isError = false;
        let errors = {
            accountIdError: "",
            passwordError: "",
            cfmPasswordError: ""
        }
        if (!isEmailValide(this.state.accountId)) {
            isError = true;
            errors.accountIdError = " invalid email address";
        }
        if (this.state.password.length < 12) {
            isError = true;
            errors.passwordError = " password must be more than 12 charactors";
        }
        if (this.state.cfmPassword !== this.state.password) {
            isError = true;
            errors.cfmPasswordError = " please check your password";
        }
        this.setState({
            ...this.state,
            ...errors,
        })
        return isError;
    }

    getErrors(){
        const {passwordError, cfmPasswordError,accountIdError} = this.state;
        return passwordError || cfmPasswordError || accountIdError;
    }

    getHint() {
        return this.hints.map(hint => this.state.accountId.includes(hint.typo) && <span key={hint.typo}>
            <s>{hint.typo}</s>
            <span>{hint.correction}</span>
        </span>
        )}


    submit(e) {
        e.preventDefault();
        const err = this.validate();
            /*this.setState({
                accountId: " ",
                password: " ",
                cfmPassword: " "
            })*/
        this.setState({isSubmit : true});
    }
    render() {
        return (
            <div>
                {this.state.isSubmit && this.getErrors() && <span> sorry </span>}
                {this.state.isSubmit && !this.getErrors() && <span> Success </span>}
            <div>
            </div>
            <div className="form">
                <form onSubmit={this.submit}>
                    <div className="email">
                    <input 
                        name="accountId"
                        type="text"
                        placeholder="Email (Account ID)" 
                        value={this.state.accountId}
                        onChange={e => this.change(e)}
                    />
                    {!this.getErrors()&& this.getHint()}
                    <span>{this.state.accountIdError}</span>
                    </div>
                    <br />
                    <div className="password">
                    <input
                        name="password"
                        type={this.state.passwordType}
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.change}
                    />
                    <span className="showbutton">
                    <input
                        name="passwordType"
                        type="button"
                        value="show"
                        onClick={this.show}
                    />
                    </span>
                    <span>{this.state.passwordError}</span>
                    </div>
                    <br />
                    <div className="cfmpassword">
                    <input
                        name="cfmPassword"
                        type={this.state.cfmPasswordType}
                        placeholder="confirm password"
                        value={this.state.cfmPassword}
                        onChange={e => this.change(e)}
                    />
                    <input
                        name="cfmPasswordType"
                        type="button"
                        value="show"
                        onClick={e => this.show(e)}
                    />
                     <span>{this.state.cfmPasswordError}</span>
                     </div>
                    <br />
                    <input
                        type="submit"
                        value="CREATE ACCOUNT"
                    />

                </form>
            </div>
            </div>
        );
    }
}

export default Form;
