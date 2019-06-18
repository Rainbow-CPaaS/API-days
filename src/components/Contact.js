import React from 'react';
import '../styles/Contact.css';

function Contact (props) {


    return (
        <div onClick={() => props.onUserChosen(props.contact)} className="contactListMember" value={props.contact} >
			{props.contact._displayName} 
			<br/>
			({props.contact.status})
        </div>
    )
}

export default Contact;
