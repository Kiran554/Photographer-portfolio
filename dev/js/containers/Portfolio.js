import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../lib/Plugins';
//import '../lib/Gallery';

require('../../scss/portfolio.scss');

class Portfolio extends Component {

	constructor(props) {
		super();
		this.state = {};
	}

	componentWillMount() {

	}

	componentDidMount() {
		//Gallery.size_assets();
		//Gallery.init.call(Gallery);
        //Thumbs.init();
	}

	constructGallery() {
		return this.props.images.map((image, index) => {
			let isLastItem = ((index + 1) === this.props.images.length);
			let anchorTags = {};
			anchorTags.className = `asset_image_container`;
			if(!isLastItem) anchorTags.href = `#no${index+2}`;

			return (
				<article className="asset image" id={`no${index+1}`} key={`gallery-${index}`}>
		          	<div className="asset_center">
		            	<a {...anchorTags}>
		              		<img className="js_lazyload" src={image} alt={image.split('.')[0]}/>
		            	</a>
		          	</div>
		        </article>
			)
		});
		
	}

	constructThumbnail() {
		return this.props.images.map((image, index) => {
			return (
				<li className="gallery_thumb image is_selected" key={`gallery-thumbnail-${index}`}>
		        	<a href={`#no${index+1}`}>
		        		<img className="js_lazyload" src={image} alt={image.split('.')[0]}/>
	        		</a>
		        </li>
	        );
		});
	}

	//<h1>{this.props.match.params.portfolioId}</h1>
	render() {
		return (
			<div className="portfolio">
				<div id="content" className="portfolio__gallery">
					{this.constructGallery()}
				</div>
				 <ul className="gallery_thumbs portfolio__gallery_thumbs">
			        {this.constructThumbnail()}
			    </ul>
			</div>
		)
	}
}

export default Portfolio;
