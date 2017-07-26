import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

require('scss/home.scss');

class Home extends Component {

	constructor(props) {
		super();
		this.state = {};
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	componentDidUpdate() {
		new AnimOnScroll( document.getElementById( 'grid' ), {
			minDuration : 0.1,
			maxDuration : 0.7,
			viewportFactor : 0.2
		} );
	}

	constructImages() {
		return (
			<ul className="grid effect-3 home__list" id="grid">
                {
                    this.props.images.map( data => {
                        return (
                            <li className="home__list-item" key={data.public_id}>
                                <Link to={data.to}>
                                    <img src={data.src} alt={data.public_id}/>
                                </Link>
                                <div className="home__item-caption">
                                	<span> {data.name} </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
	}

	render() {
		return (
			<div className="home">
				{this.props.images && this.constructImages()}
			</div>
		);
	}
}

export default Home;
