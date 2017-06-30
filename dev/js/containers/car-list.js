import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class CarList extends Component {

	setCarModelClass(car) {
		return 'car__model' + 
				(this.isRaceStarted ? ' car__horizontal-translate'+ car.speed : '');
	}

	setCarPosition(car) {
		return (
			<div className="car__position">
				<span className="car__position-value">{`${car.position}. place`}</span>
			</div>
			);
	}

	createRacingCarUI(car) {

		return (
			<li className="car__list-item" key={car.id}> 
				<div className="car__bet">
					<span className="car__bet-value">${car.bet}</span>
				</div>
				<div className="car__race-track">
					<img className={this.setCarModelClass(car)} src={car.thumbnail} alt={car.description} title={car.description}/>
				</div>
				{this.isRaceEnded && this.setCarPosition(car)}
			</li>
			);
	}

	createListItems() {
		let props = this.props.cars.map((car, index) => {
			car.bet = this.props.carBets[index]; 
			if (this.isRaceStarted) car.speed = this.props.carSpeeds[index]; 
			if (this.isRaceStarted && this.isRaceEnded) car.position = this.props.carPositions[index]; 
			return car;
		});

		return props.map(
			car => this.createRacingCarUI.call(this, car)
		);
	}

	render() {
		this.isRaceStarted = this.props.carSpeeds && this.props.carSpeeds.length === this.props.cars.length;
		this.isRaceEnded = this.props.carPositions && this.props.carPositions.length === this.props.cars.length;

		return (
			<ul className="list-unstyled">
				{this.createListItems()}
			</ul>
		);
	}
}

function mapStateToProps (state) {
	return {
		cars: state.cars,
		carSpeeds: state.carSpeeds,
		carPositions: state.carPositions,
		carBets: state.carBets
	};
}

export default connect(mapStateToProps)(CarList);