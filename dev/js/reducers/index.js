import {combineReducers} from 'redux';
import CarReducer from './reducer-cars';
import CarSpeedsReducer from './reducer-car-speeds';
import CarPositionsReducer from './reducer-car-positions';
import CarBetsReducer from './reducer-car-bets';
import RaceDefaultsReducer from './reducer-race-defaults';
import TotalFundsReducer from './reducer-total-funds';
import GameResultReducer from './reducer-game-result';

const allReducers = combineReducers({
	cars: CarReducer,
	raceDefaults: RaceDefaultsReducer,
	carSpeeds: CarSpeedsReducer,
	carPositions: CarPositionsReducer,
	carBets: CarBetsReducer,
	totalFunds: TotalFundsReducer,
	finalResult: GameResultReducer
});

export default allReducers;