import React, { Component } from "react";
import '../styles/App.css';
import Login from './Login';
import ContactList from './ContactList'
import WebRTC from './WebRTC/WebRTC'

class App extends Component {

    constructor () {
        super();
        this.state = {
            status: '',
            chosenUser: null,
			contacts: [],
			loaded: false,
        }

        this.onUserChosen = this.onUserChosen.bind(this);
        this.populateContactList = this.populateContactList.bind(this);
        this.onContactInfoChanged = this.onContactInfoChanged.bind(this);
    }

    onUserChosen (contact) {
        console.log('[ONUSERCHOSEN] :: User changed: ', contact);
        this.setState({ chosenUser: contact });
    }

    populateContactList () {
		this.setState({ loaded: true })
        let contactsReceived = rainbowSDK.contacts.getNetworkContacts();
		console.log(contactsReceived);
        this.setState({ contacts: contactsReceived });
        $(document).on(rainbowSDK.contacts.RAINBOW_ONCONTACTINFORMATIONCHANGED, this.onContactInfoChanged);
    }

    onContactInfoChanged (event, contactUpdated) {
        let contactsCopy = this.state.contacts;
        const index = contactsCopy.indexOf(contactUpdated);
        if (index !== -1) {
            contactsCopy[index] = contactUpdated;
        }
        this.setState({ contacts: contactsCopy });
    }



    render() {
        return (
            <div id="appComponent">
				{!this.state.loaded && <Login populateContacts={this.populateContactList} onUserChosen={this.onUserChosen}/> }
				<div className="applicationWindow">
					{this.state.loaded && <ContactList populateContactList={this.populateContactList} class={this.state.chosenUser ? "ContactListSmall" : "ContactListBig"}searchContactByName={this.searchContactByName} contacts={this.state.contacts} onUserChosen={this.onUserChosen}/>}
					{this.state.chosenUser && <WebRTC connectedUser={this.state.connectedUser} key={this.state.chosenUser.dbId} chosenUser={this.state.chosenUser}/>}
				</div>
            </div>
        )
    }
}

export default App;
