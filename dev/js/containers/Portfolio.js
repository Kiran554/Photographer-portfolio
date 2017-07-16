import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'lib/Plugins';
import 'lib/Gallery';

require('scss/portfolio.scss');

class Portfolio extends Component {

	constructor(props) {
		super();
		this.state = {toggleGallery: false};
	}

	componentWillMount() {

	}

	componentDidMount() {
		Gallery.cache_assets_dom_elements();
		Gallery.size_assets();
		Gallery.init.call(Gallery);
        Thumbs.init();
	}

	constructGallery() {
		let className = [
						"portfolio__gallery",
						(this.state.toggleGallery ? "portfolio__gallery--cover" : "")
						].join(' ').trim();
		return (
			<div id="content" className={className}>
				{this.props.images.map((image, index) => {
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
				{this.props.images.map((image, index) => {
					return (
						<li className="gallery_thumb image is_selected" key={`gallery-thumbnail-${index}`} id={`thumb${index+1}`}>
				        	<a href={`#no${index+1}`}>
				        		<img className="js_lazyload" src={image} alt={image.split('.')[0]}/>
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

	//<h1>{this.props.match.params.portfolioId}</h1>
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
