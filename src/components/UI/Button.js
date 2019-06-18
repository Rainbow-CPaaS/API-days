import React from 'react';
import './stylesUI.css';

class Button extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<button	
				className={this.props.class} 
				onClick={this.props.action} 
				type={this.props.type}>

				{this.props.buttonTitle}

			</button>
		)
	}
}

export default Button;
