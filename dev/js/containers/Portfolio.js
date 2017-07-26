import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CommunicationService from 'services/CommunicationService';
import 'lib/Plugins';
import 'lib/Gallery';

require('scss/portfolio.scss');

class Portfolio extends Component {

	constructor(props) {
		super();
		this.state = {toggleGallery: false, gallery: []};
		this.type = props.match.params.portfolioId;
	}

	componentWillMount() {
		this.getPortfolioImages();
	}

	componentDidMount() {
	}

	componentWillUpdate() {
	}

	componentDidUpdate() {
		if(this.type !== this.props.match.params.portfolioId) {
			this.type = this.props.match.params.portfolioId;
			this.getPortfolioImages();
		} else {
			Gallery.cache_assets_dom_elements();
			Gallery.size_assets();
			Gallery.init.call(Gallery);
	        Thumbs.init();
	    }
	}

	getPortfolioImages() {
		// start the spinner
		CommunicationService.get(`/fetchGallery.action?type=${this.type}`).then( data => {
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

	mapGalleryResponse(response) {
		let viewPort = CommunicationService.getViewportDimensions(this.type);
		let thumbnailViewPort = CommunicationService.getViewportDimensions('thumbnail');

		return response.map( (value, index) => {
            let width = viewPort.width < value.width ? viewPort.width : value.width
            let height = viewPort.height < value.height ? viewPort.height : value.height
            let crop = 'fit';
            let src = `http://res.cloudinary.com/sharathmodumpally/image/upload/c_${crop},h_${height},w_${width}/v${value.version}/${value.public_id}.${value.format}`;
            let thumbnailSrc = `http://res.cloudinary.com/sharathmodumpally/image/upload/c_thumb,g_center,h_${thumbnailViewPort.height},w_${thumbnailViewPort.width}/v${value.version}/${value.public_id}.${value.format}`;

			return $.extend(true, value, {width, height, crop, src, thumbnailSrc});
		});
	}

	constructGallery() {
		let className = [
						"portfolio__gallery",
						(this.state.toggleGallery ? "portfolio__gallery--cover" : "")
						].join(' ').trim();
		return (
			<div id="content" className={className}>
				{this.state.gallery && this.state.gallery.map((image, index) => {
					let isLastItem = ((index + 1) === this.state.gallery.length);
					let anchorTags = {};
					anchorTags.className = `asset_image_container`;
					if(!isLastItem) anchorTags.href = `#no${index+2}`;

					return (
						<article className="asset image" id={`no${index+1}`} key={`gallery-${index}`}>
				          	<div className="asset_center">
				            	<a {...anchorTags}>
				              		<img className="js_lazyload" src={image.src} alt={image.public_id}/>
				            	</a>
				          	</div>
				        </article>
					);
				})}
			</div>
		);
	}

	constructThumbnail() {
		let className = [
						"gallery_thumbs",
						"portfolio__gallery_thumbs",
						(this.state.toggleGallery ? "portfolio__gallery_thumbs--show" : "")
						].join(' ').trim();
		return (
			<ul className={className} onClick={this.toggleGallery.bind(this, false)}>
				{this.state.gallery && this.state.gallery.map((image, index) => {
					return (
						<li className="gallery_thumb image is_selected" key={`gallery-thumbnail-${index}`} id={`thumb${index+1}`}>
				        	<a href={`#no${index+1}`}>
				        		<img className="js_lazyload" src={image.src} alt={image.public_id}/>
			        		</a>
				        </li>
			        );
				})}
			</ul>
		)
	}

	constructShortcut() {
		let className = [
						"portfolio__shortcut",
						(this.state.toggleGallery ? "portfolio__shortcut--hide" : "")
						].join(' ').trim();
		return (
			<div className={className} onClick={this.toggleGallery.bind(this, true)}>
				<span className={ `portfolio__shortcut-icon glyphicon glyphicon-sort-by-attributes-alt` }></span>
				<span className={ `portfolio__shortcut-icon glyphicon glyphicon-picture` }></span>
			</div>
		);
	}

	constructCover() {
		let className = [
						"portfolio__cover",
						(this.state.toggleGallery ? "portfolio__cover--show" : "")
						].join(' ').trim();
		return (
			<div className={className}>
			</div>
		);
	}

	toggleGallery(flag) {
		this.setState({toggleGallery: flag});

	}

	render() {
		return (
			<div className="portfolio" >
				{this.constructCover()}
				{this.constructShortcut()}
				{this.constructGallery()}
			    {this.constructThumbnail()}
			</div>
		)
	}
}

export default Portfolio;
