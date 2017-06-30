export default function (state=`Place Bets to see your Luck!!`, action) {
	switch (action.type) {
        case 'GAME_RESULT':
        	return action.payload
            break;
    }
    return state;
}