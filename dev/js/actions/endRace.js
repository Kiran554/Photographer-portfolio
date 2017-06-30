export const endRace = (carPositions) => {
	return {
		type: 'END_RACE',
		payload: carPositions
	}
};

