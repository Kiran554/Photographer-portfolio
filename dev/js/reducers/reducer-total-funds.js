export default function (state=1000, action) {
	switch (action.type) {
        case 'UPDATE_TOTAL_FUNDS':
            return action.payload;
            break;
    }
    return state;
}