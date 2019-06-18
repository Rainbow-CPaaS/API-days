import React from 'react';
import './stylesUI.css';

class TitleBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div className={`TitleBar ${this.props.class}`}>
				<h3>{this.props.title}</h3>
			</div>
		)
	}
}

export default TitleBar;
