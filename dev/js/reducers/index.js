import {combineReducers} from 'redux';
import SiteinfoReducer from './reducer-siteinfo';

const allReducers = combineReducers({
	Siteinfo: SiteinfoReducer
});

export default allReducers;