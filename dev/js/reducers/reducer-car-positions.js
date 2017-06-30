export default function (state=null, action) {
	switch (action.type) {
        case 'END_RACE':
            return action.payload;
            break;
    }
    return state;
}