export default function (state=[0,0,0,0], action) {
	switch (action.type) {
        case 'PLACE_BETS':
            return action.payload;
            break;
    }
    return state;
}