import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from './Home';
import Portfolio from './Portfolio';
import Contact from './Contact';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

console.log(process);
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
	}

	componentDidMount() {

	}

	render() {
		return (
			<main className="mainContent"> 
			 	<Route exact path="/" render={(props)=> <Home images={this.imageList} {...props}/>}/>
		      	<Route path="/portfolio/:portfolioId" render={(props)=> <Portfolio images={this.imageList} {...props}/>}/>
		      	<Route path="/contact" component={Contact}/>
			 </main>
			)
	}
}

export default MainContent;