import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Footer extends Component {

	componentWillMount() {

	}

	constructFooterList () {
		let footerList = [
			{
				name: 'Facebook',
				id: 'facebook',
				icon: 'fa fa-facebook',
				link: ''
			},
			{
				name: 'Twitter',
				id: 'twitter',
				icon: 'fa fa-twitter',
				link: ''
			},
			{
				name: 'Instagram',
				id: 'nstagram',
				icon: 'fa fa-instagram',
				link: ''
			}
		]
		return footerList.map((item, index) => 
				( <li key={item.id} className="footer__social-icon-item" title={`Click to navigate to ${item.name}`}>
					<a href={item.link}> <i className={item.icon}> </i> </a>
				</li>)
			);
	}

	render() {
		return (
				<footer className="footer"> <div className="conatiner">
						<div className="row footer__row">
 
							<div className="col-sm-6 col-xs-12 footer__copyright__col">
								<div className="footer__copyright">
									<p><em>All Images © Sharath Modumpally {new Date().getFullYear()}</em></p>
								</div>
							</div>

							<div className="col-sm-6 col-xs-12 footer__socialmedia-col">
								<div className="footer__social-icons">
					                <ul className="footer__social-icons-list">
					                    {this.constructFooterList()}
					                </ul>
					            </div>
							</div>

						</div>

					</div>
				</footer>
			)
	}
}

export default Footer;
