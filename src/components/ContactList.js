import React from 'react';
import Contact from './Contact';
import ContactFound from './ContactFound';
import TitleBar from './UI/TitleBar';
import TextField from './UI/TextField';
import Button from './UI/Button';

class ContactList extends React.Component {

    constructor(props) {
        super(props);

		this.state = {
			searchedContact: '',
			foundContacts: [],
		}

		this.searchContactByName = this.searchContactByName.bind(this);
		this.handleChangeSearch = this.handleChangeSearch.bind(this);
		this.addToNetwork = this.addToNetwork.bind(this);
		this.getAllContacts = this.getAllContacts.bind(this);
        
    }

	searchContactByName(){
		console.log("Search Contact by name :: ", this.state.searchedContact)
		rainbowSDK.contacts.searchByName(this.state.searchedContact, 10)
			.then(contacts => {
				this.setState({foundContacts: contacts});
				console.log("[searchContactByName] :: Found contacts:", contacts);
			})
			.catch(err => console.log(err));
		this.props.populateContactList();
	}

	handleChangeSearch(event){
		this.setState({searchedContact: event.target.value})
	}

	addToNetwork(contact) {
		console.log("Add to network");
		rainbowSDK.contacts.addToNetwork(contact)
			.then(contact => {
				console.log("Contact added to network", contact)
				this.setState({foundContacts: []})
				this.props.populateContactList();
			}).catch(err => console.log(err))
	}

	getAllContacts() {
		this.props.populateContactList();
	}


    render () {
        const contactListItems = this.props.contacts.map( contact => <Contact chosenUser={this.props.chosenUser} onUserChosen={this.props.onUserChosen} key={contact.dbId} contact={contact} />);
        const contactsFoundList = this.state.foundContacts.map( contact => <ContactFound addToNetwork={this.addToNetwork} key={contact.dbId} contact={contact} />);

        return (
			<div className={this.props.class}>
				<TitleBar title="Contacts"/>
				<TextField
					class="TextFieldLong"
					type="text"
					placeholder="Search Contact"
					onChange = {this.handleChangeSearch}
				 />

				{this.state.searchedContact.length > 0 && <Button buttonTitle="Search" class="ButtonSearch" action={this.searchContactByName} type="submit"/>}	
				{this.props.contacts.length == 0 && <Button buttonTitle="Refresh" class="ButtonSearch" action={this.getAllContacts} type="button"/>}	


				<div id="contacts" >
					{contactListItems}
				</div>

				{this.state.foundContacts.length > 0 && <div><h2>Contacts found:</h2> {contactsFoundList}</div>}
			</div>
        )
    }
}

export default ContactList;
