import React from 'react';
import '../styles/Contact.css';

function ContactFound (props) {


    return (
		<div onClick={() => props.addToNetwork(props.contact)} className="contactListMember" value={props.contact} >
			{props.contact._displayName} 
			<br/>
			<p>Click to add to contacts</p>
        </div>
    )
}

export default ContactFound;
