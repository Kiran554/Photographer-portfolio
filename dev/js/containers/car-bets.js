import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {placeBets} from '../actions/placeBets';

class CarBets extends Component {

	componentWillUpdate() {
		// Default behavior
		this.refs.gameResetError.classList.add('hide');
		this.refs.fundLimitError.classList.add('hide');
	}

	setUpBetsUI() {

		let cars = this.props.cars;
		let carBets = this.props.carBets;
		return cars.map((car, index) =>
			<div className="form-group row center-block" key={car.id}>
		    	<label htmlFor={`car${car.id}`} className="col-xs-6 col-form-label">{car.name + ` (${car.color})`}</label>
		  		<div className="col-xs-6">
		  			<span className="car__bet-dollar"> $ </span>
		    		<input className="form-control car__bet-selected" type="number" defaultValue={carBets[index]} step="50" min="0" id={`car${car.id}`} ref={`car${car.id}`} />
		  		</div>
			</div>
			);
	}

	setUpBetValues() {
		let car = this.props.cars;
		let carBets = car.map(car => parseInt(this.refs[`car${car.id}`].value));
		let sumOfAllBets = carBets.reduce((result, bet, index) => result += bet, 0);

		// Race is already done
		if(this.props.carSpeeds) {
			this.refs.gameResetError.classList.remove('hide');
		} else if (sumOfAllBets > this.props.totalFunds) { // Bets are not valid
			this.refs.fundLimitError.classList.remove('hide');
		} else { // Everything is success then start race
			this.props.placeBets(carBets);
			$('#carBetModal').modal('hide');
		}
	}

	render () {
		return (
			<div className="modal fade" id="carBetModal" role="dialog">
			    <div className="modal-dialog">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal">&times;</button>
			          <h4 className="modal-title">Place Bet</h4>
			        </div>

			        <div className="modal-body">

			            <div className="row">
			            	<div className="border col-xs-2"> </div>
						    <div className="border col-xs-8">
						  		{this.setUpBetsUI()}
							<div className="border col-xs-2"> </div>
							</div>
						</div>

			        </div>
			        <div className="alert alert-danger hide" ref="gameResetError">
					    <strong>Error!</strong> Reset the Game to place a new Bet!!
				  	</div>
				  	<div className="alert alert-danger hide" ref="fundLimitError">
					    <strong>Error!</strong> Your Bet can't exceed available Funds!!
				  	</div>
			        <div className="modal-footer">
			         	<button type="submit" className="btn btn-success btn-default pull-left" onClick={this.setUpBetValues.bind(this)}>Save</button>
          				<button type="submit" className="btn btn-danger btn-default" data-dismiss="modal">Cancel</button>
			        </div>
			      </div>
			      
			    </div>
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
	return bindActionCreators({placeBets}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CarBets);

