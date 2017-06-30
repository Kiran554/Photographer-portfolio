import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Header extends Component {

	componentWillMount() {

	}

	goBackHome() {
		// go back home
	}

	constructHeaderList() {
        let headerList = [
        	{
                'name': 'Home',
                'id': 'home',
                'icon': 'glyphicon glyphicon-home',
                'clickHandler': this.goBackHome.bind(this),
                'to': '/'
            },
            {
                'name': 'Portfolio',
                'id': 'portfolio',
                'icon': 'glyphicon glyphicon-triangle-bottom',
                'hasDropDown': true,
                'nestedItems': [
                    {
                        name: 'Places',
                        to: '/portfolio/places'
                    },
                    {
                        name: 'People',
                        to: '/portfolio/people'
                    },
                    {
                        name: 'Nature',
                        to: '/portfolio/nature'
                    },
                    {
                        name: 'Wild Life',
                        to: '/portfolio/wild-life'
                    },
                    {
                        name: 'Cars',
                        to: '/portfolio/cars'
                    },
                    {
                        name: 'Devotional',
                        to: '/portfolio/devotional'
                    },
                    {
                        name: 'Marriage',
                        to: '/portfolio/marriage'
                    },
                    {
                        name: 'Others',
                        to: '/portfolio/others'
                    }
                ]
            },
            
            {
                'name': 'Contact',
                'id': 'contact',
                'icon': 'glyphicon glyphicon-user',
                'to': '/contact'
            }
            /*{
                'name': 'Start Call',
                'id': 'call',
                'icon': 'glyphicon glyphicon-earphone',
                'secondary': true,
                'secondaryName': '00:00',
                'secondaryId': 'time',
                'clickHandler': this.handleTimer.bind(this, 1)
            }*/
        ];
        return headerList.map(item =>
            <li className="header__nav-list-item" key={ item.id }>
                {
                    constructLink(item)
                }
            </li>
        );

        function constructLink(item) {
            return (
                item.hasDropDown ?
                    (<div className="header__dropdown">
                    	<input id={`header-${item.id}`} className="header__dropdown-checkbox hide" type="checkbox" name={`header-${item.id}`} />
		                <label className="header__dropdown-label" htmlFor={`header-${item.id}`} >
		                    {linkItem(item)}
		                </label>
                        <ul className="header__dropdown-menu">
                            {item.nestedItems && constructNestedItems(item.id, item.nestedItems)}
                        </ul>
                    </div>) :
                    linkItem(item)
            );
        }
        function linkItem(item) {
            var linkClasses = {};
            var isLink = true;
            var linkHTML = (
                <span>
                <span className={ `header__nav-icon ${item.icon}` }></span>
                    <span className={ `header__nav-label-${item.id}` } ref={ item.id }>{ item.name }</span>
                    {item.secondary && <span className={ `header__nav-secondary-label-${item.id}` }
                                             ref={ item.secondaryId }>{ item.secondaryName }</span>}
                </span>
            );

            if(item.hasDropDown) linkClasses['className'] = 'header__dropdown-toggle';
            if(item.clickHandler) linkClasses['onClick'] = item.clickHandler;
            if(item.secondary) linkClasses['className'] = 'header__nav-list-timer-start';
            if(item.to) {
                linkClasses.to = item.to;
            } else {
                isLink = false;
            }

            return (
            isLink ?
                <Link {...linkClasses}>
                    {linkHTML}
                </Link> :
                <a {...linkClasses}>
                    {linkHTML}
                </a>
            );
        }

        function constructNestedItems(id, nestedItems) {
            return nestedItems.map((item, index) =>
                <li key={`${id}-${index}`}><Link to={item.to}> {item.name} </Link></li>);
        }
    }

	render() {
		return (
				<header className="header"> 
					<div className="conatiner">
						<div className="row header__row">
 
							<div className="col-sm-4 col-xs-8 header__logo-col">
								<div className="header__logo">
									<Link to="/">
										Sharath Modumpally
										<span> PHOTOGRAPHY </span>
									</Link>
								</div>
							</div>

							<div className="col-sm-8 col-xs-12 header__nav-col">
								<div className="header__nav">
					                <input id="header-nav" className="header__nav-checkbox hide" type="checkbox" name="header-nav" />
					                <label className="header__nav-label" htmlFor="header-nav">
					                    <span className="header__nav-breadcrumb header__nav-close">&#9776;</span>
					                    <span className="header__nav-breadcrumb header__nav-open">&#10005;</span>
					                </label>
					                <ul className="header__nav-list">
					                    {this.constructHeaderList()}
					                </ul>
					            </div>
							</div>

						</div>

					</div>
				 </header>
			)
	}
}

export default Header;
