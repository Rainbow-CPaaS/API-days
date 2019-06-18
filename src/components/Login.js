import React from 'react';

import TitleBar from './UI/TitleBar';
import TextField from './UI/TextField';
import Button from './UI/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
			password: '',
            status: '',
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.logIn = this.logIn.bind(this);
        this.onConnectionStateChanged = this.onConnectionStateChanged.bind(this);
		this.handleChangeUser = this.handleChangeUser.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
    }



    onConnectionStateChanged (event, connectionStatus) {
        console.log('[LOGIN] ON CONNECTION STATE CHANGED: ', connectionStatus);
        this.setState({ status: connectionStatus});
        console.log(this.state.status);
        if (this.state.status === "connected") {
            this.props.populateContacts();
        }
    }
    
    onChangeHandler () {
        const username = event.target.value;
        this.setState({ user: username });
    }


    logIn () {
        $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this.onConnectionStateChanged);
		rainbowSDK.connection.signin(this.state.user, this.state.password)
            .then(account => console.log('Signed IN!', account))
            .catch(err => console.log(err));
    }

	handleChangeUser(event) {
		this.setState({user: event.target.value});
	}
	
	handleChangePassword(event) {
		this.setState({password: event.target.value});
	}

    render () {
        return (
            <div id="user">
                <div>
					<div>
						<TitleBar
							title="Connect to Rainbow"
						/>
						<TextField
							 type="text"
							 placeholder="Login"
							 onChange={this.handleChangeUser}
						 />
						<br/>
					    <TextField
					        type="password"
					        placeholder="Password"
						    onChange={this.handleChangePassword}
						/>
						<br/>
						<Button type="submit" class="ButtonSubmit" buttonTitle="Submit" action={this.logIn}/>
					</div>
				</div>
            </div>
        )
    }
}
export default Login;
