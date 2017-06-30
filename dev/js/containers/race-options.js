import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {startRace} from '../actions/startRace';
import {endRace} from '../actions/endRace';
import {updateFunds} from '../actions/updateFunds';
import {gameResult} from '../actions/gameResult';
import CarBets from './car-bets';

class RaceOptions extends Component {

	updateFunds(carSpeeds) {
		let carBets = this.props.carBets;
		let totalFunds = this.props.totalFunds;
		let winnerCarIndex = carSpeeds.findIndex(speed => speed === 1);
		let finalResult = false;
		let profit = 0;
		let loss = 0;
		let newFunds = carBets.reduce((result, bet, index) => {
			if(index === winnerCarIndex) {
				result += bet;
				finalResult = bet > 0;
				profit += bet;
			} else {
				result -= bet;
				loss += bet;
			}
			return result;
		}, totalFunds);

		this.props.updateFunds(newFunds);

		finalResult = (loss || profit) ?
			(finalResult ? `Congrats, You won $${profit}!!` : `Oops, you lost $${loss}!!`) :
			`No Profit or No Loss!!`;
		this.props.gameResult(finalResult);

	}

	generateRandomSpeeds(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	setRandomSpeeds() {
		let carCount = this.props.cars.length;
		let carSpeeds = [...Array(carCount)].map((value,index) => index+1);
		carSpeeds = this.generateRandomSpeeds(carSpeeds);
		this.props.startRace(carSpeeds);
		// Set the end result only after N (No. of cars) seconds.
		setTimeout( () => {
			if(this.props.carSpeeds) {
				this.props.endRace(carSpeeds);
				this.updateFunds(carSpeeds);
			}
		}, carCount*1000);
		
	}

	render() {
		return (
				<div className="row">
					<div className="col-xs-6"> 
						<button type="button" className="btn btn-primary btn-lg center-block" data-toggle="modal" data-target="#carBetModal">
							Place Bet
						</button>
					</div>
					<div className="col-xs-6">
						<button onClick={this.setRandomSpeeds.bind(this)} type="button" className="btn btn-primary btn-lg center-block">
							Start Race
						</button>
					</div>
					<CarBets />
				</div>
			);
	}
}

function mapStateToProps (state) {
	return {
		cars: state.cars,
		carBets: state.carBets,
		carSpeeds: state.carSpeeds,
		totalFunds: state.totalFunds
	};
}

function matchDispatchToProps (dispatch) {
	return bindActionCreators({startRace, endRace, updateFunds, gameResult}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(RaceOptions);