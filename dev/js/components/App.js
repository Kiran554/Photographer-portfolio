import React from 'react';
import Header from '../containers/Header';
import MainContent from '../containers/Main-content';
import Footer from '../containers/Footer';
import 'bootstrap/dist/js/bootstrap';
import '../lib/AnimOnScroll';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

require('bootstrap/dist/css/bootstrap.css');
require('../../scss/style.scss');

const App = () => (
	<Router>
		<div className="">
			<Header/>
			<MainContent/>
			<Footer/>
		</div>
	</Router>
);

export default App;
