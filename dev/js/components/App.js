import React from 'react';
import Header from 'containers/Header';
import MainContent from 'containers/Main-content';
import Footer from 'containers/Footer';
import 'bootstrap/dist/js/bootstrap';
import 'lib/AnimOnScroll';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

require('bootstrap/dist/css/bootstrap.css');
require('scss/style.scss');

const App = () => (
	<Router>
		<Route render={({ location, history, match}) => (
      		<div>
		        <Route exact path="/" render={() => (
		          <Redirect to="/"/>
		        )}/>

				<Header/>
				<MainContent/>
				<Footer/>

			</div>
    	)}/>
	</Router>
);

export default App;
