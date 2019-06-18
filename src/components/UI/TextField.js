import React from 'react';
import './stylesUI.css';

class TextField extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div>
				<input className={`TextField ${this.props.class}`} onChange={this.props.onChange} placeholder={this.props.placeholder} type={this.props.type}/>
			</div>
		)
	}
}

export default TextField;
