import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Contact extends Component {

	componentWillMount() {

	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="contact">
				<div className="conatiner">
					<div className="row contact__row no-margin">
 
							<div className="col-sm-8 col-xs-12 contact__left-col no-padding">
								<div className="conatiner">
									<div className="row contact__left-row no-margin">
										<div className="col-sm-6 col-xs-12 no-padding">
											<img className="contact_photo" src="http://res.cloudinary.com/sharathmodumpally/image/upload/w_150,h_100,c_fill/sample.jpg"/>
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
