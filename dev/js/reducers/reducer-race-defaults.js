const defaults = {
        bets: [0, 0, 0, 0],
        totalFunds: 1000,
        speeds: null,
        positions: null,
        finalResult: `Place Bets to see your Luck!!`
    };

export default function (state, action) {
    switch (action.type) {
        case 'RESET_RACE':
            return defaults;
            break;
    }
    return defaults;
}