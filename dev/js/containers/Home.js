import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

require('../../scss/home.scss');

class Home extends Component {

	constructor(props) {
		super();
		this.state = {};
	}

	componentWillMount() {

	}

	componentDidMount() {
		new AnimOnScroll( document.getElementById( 'grid' ), {
				minDuration : 0.4,
				maxDuration : 0.7,
				viewportFactor : 0.2
			} );
	}

	constructImages() {
		return this.props.images.map((image, index) =>
				<li key={`image-${index}`}><Link to="/portfolio/places"><img src={image}/></Link></li>
			);
	}

	render() {
		return (
			<div className="home">
				<ul className="grid effect-3 home__list" id="grid">
					{this.constructImages()}
				</ul>
			</div>
		)
	}
}

export default Home;
