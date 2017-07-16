import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {RouteTransition, presets} from 'react-router-transition';
import {connect} from 'react-redux';
import Home from './Home';
import Portfolio from './Portfolio';
import Contact from './Contact';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

console.log(process.env.NODE_ENV);
class MainContent extends Component {

	constructor(props) {
		super();
		this.state = {};
	}

	componentWillMount() {
		const imagesFolder = '/images/';
		
		this.imageList = imagesToLoad.filter(file => 
		  /[a-zA-Z0-9]+.(png|jpg|jpeg)/.test(file)
		).map(file => imagesFolder+file);
		//console.log(this.imageList);
		console.log(this.props);
	}

	componentDidMount() {

	}

	render() {
		// Scroll to top
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		// Uncheked if checked before adding new content
		$('#header-nav').is(':checked') && $('#header-nav').prop('checked',false);

		return (
			<main className="mainContent">
				<Route location={location} key={location.key} exact path="/" render={(props)=> <Home images={this.imageList} {...props}/>}/>
				<Route location={location} key={location.key}  path="/portfolio/:portfolioId" render={(props)=> <Portfolio images={this.imageList} {...props}/>}/>
		      	<Route location={location} key={location.key}  path="/contact" component={Contact}/>
				{/*<RouteTransition 
			        pathname={location.pathname}
			        className="transition-wrapper"
			        {...presets.slideLeft}>
		         	<Switch key={location.key} location={location}>
				      	<Route location={location} key={location.key}  path="/portfolio/:portfolioId" render={(props)=> <Portfolio images={this.imageList} {...props}/>}/>
				      	<Route location={location} key={location.key}  path="/contact" component={Contact}/>
			      	</Switch>
			   	</RouteTransition>*/}

			 </main>
			)
	}
}

export default MainContent;
