import React, {Component} from 'react';
import CommunicationService from 'services/CommunicationService';
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

class App extends Component {

	constructor() {
		super();
		this.state = {gallery: []};
	}

	componentWillMount() {
		// start the spinner
		CommunicationService.get('/fetchGallery.action?type=main').then( data => {
			let result = JSON.parse(data);
			return this.mapGalleryResponse(result.resources);			
		}).then( (response) => {
			console.log(response);
			this.setState({gallery: response});
		}).catch( (error) => {
			console.error('Failed!!', error);
		}).then( () => {
			// close the spinner
		})
	}

	componentDidMount() {

	}

	mapGalleryResponse(response) {
		let viewPort = CommunicationService.getViewportDimensions('main');
		
		return response.map( (value, index) => {
			let name = value.context;
            let width = viewPort.width < value.width ? viewPort.width : value.width
            let height = viewPort.height < value.height ? viewPort.height : value.height
            let crop = 'fit';
            let to;
            let src;

            name = name && name.custom;
            name = name && name.type;
            to = constructLink(name);
            src = `http://res.cloudinary.com/sharathmodumpally/image/upload/c_${crop},h_${height},w_${width}/v${value.version}/${value.public_id}.${value.format}`;

			return $.extend(true, value, {name, to, width, height, crop, src});
		}).sort( (a, b) => {
			let order1 = a.context;
			let order2 = b.context;

            order1 = order1 && order1.custom;
            order1 = order1 && parseInt(order1.order);
            order2 = order2 && order2.custom;
            order2 = order2 && parseInt(order2.order);

            return order1 > order2;
		});

        function constructLink (name) {
            return `/portfolio/${name.split(" ").map( value => value.toLowerCase()).join("_")}`;
        }
	}

	render() {
		return (
			<Router>
				<Route render={({ location, history, match}) => (
		      		<div>
				        <Route exact path="/" render={() => (
				          <Redirect to="/"/>
				        )}/>

						<Header gallery={this.state.gallery}/>
						<MainContent gallery={this.state.gallery}/>
						<Footer/>

					</div>
		    	)}/>
			</Router>
		);
	}
}

export default App;
