export default function (state=null, action) {
	switch (action.type) {
        case 'START_RACE':
            return action.payload;
            break;
    }
    return state;
}