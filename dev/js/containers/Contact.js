import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CommunicationService from 'services/CommunicationService';

class Contact extends Component {

	constructor(props) {
		super();
		this.state = {contactImage: null};
		this.type = 'profile';
	} 

	componentWillMount() {
		// start the spinner
		CommunicationService.get(`/fetchGallery.action?type=${this.type}`).then( data => {
			if(!data) throw new Error('No Data available!!')
			let result = JSON.parse(data);
			return this.mapGalleryResponse(result.resources);			
		}).then( (response) => {
			console.log(response);
			this.setState({contactImage: response[0]});
		}).catch( (error) => {
			console.error('Failed!!', error);
		}).then( () => {
			// close the spinner
		})
	}

	componentDidMount() {
	}

	mapGalleryResponse(response) {
		let viewPort = CommunicationService.getViewportDimensions(this.type);

		return response.map( (value, index) => {
            let width = viewPort.width < value.width ? viewPort.width : value.width
            let height = viewPort.height < value.height ? viewPort.height : value.height
            let src = `http://res.cloudinary.com/sharathmodumpally/image/upload/c_thumb,g_center,h_${height},w_${width}/v${value.version}/${value.public_id}.${value.format}`;

			return $.extend(true, value, {width, height, src});
		});
	}

	render() {
		return (
			<div className="contact">
				<div className="conatiner">
					<div className="row contact__row no-margin">
 
							<div className="col-sm-8 col-xs-12 contact__left-col no-padding">
								<div className="conatiner">
									<div className="row contact__left-row no-margin">
										<div className="col-sm-6 col-xs-12 no-padding text-center">
											{this.state.contactImage && <img className="contact__photo" src={this.state.contactImage.src} alt={this.state.contactImage.public_id}/>}
										</div>
										<div className="col-sm-6 col-xs-12 no-padding">
											<p className="contact__into">
												Sharath is Karimnagar-born Photographer. After a stint in the software world, quit is day job and started making images full time.
												<br/>
												He likes to shoot in a loose, fluid manner and tries to sneak at least one pack of polaroid into every shoot day.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-4 col-xs-12 contact__right-col no-padding">
								<h1>Contact Me</h1>
								<br/>
								<br/>
								<h2> Phone </h2>
								<a>xxxxxxxxxx</a>
								<hr/>
								<h2> Email </h2>
								<a>xxxxxxxxxx@gmail.com</a>
								<hr/>
								<h2> On the web </h2>
								<a></a>
								<hr/>
							</div>

					</div>
				</div>
			</div>
		)
	}
}

export default Contact;
