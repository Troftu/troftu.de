export const concept2Destinations = {
	profile: {
		title: "Concept2 logbook profile",
		target: "https://log.concept2.com/profile/1054524",
	},
	log: {
		title: "Concept2 logbook",
		target: "https://log.concept2.com/profile/1054524/log",
	},
	"2k": {
		title: "Concept2 2k ranking",
		target: "https://log.concept2.com/rankings/2025/rower/2000?age=&weight=&gender=&rower=rower&status=verified&page=15#709&:~:text=Dennis%20Pohl",
	},
	"5k": {
		title: "Concept2 5k ranking",
		target: "https://log.concept2.com/rankings/2025/rower/5000?age=&weight=&gender=&rower=rower&status=verified&page=5#247&:~:text=Dennis%20Pohl",
	},
	"10k": {
		title: "Concept2 10k ranking",
		target: "https://log.concept2.com/rankings/2025/rower/10000?age=&weight=&gender=&rower=rower&status=verified&page=4#191&:~:text=Dennis%20Pohl",
	},
	"1h": {
		title: "Concept2 1 hour ranking",
		target: "https://log.concept2.com/rankings/2025/rower/60?age=&weight=&gender=&rower=rower&status=verified&page=3#121&:~:text=Dennis%20Pohl",
	},
} as const;

class Rowing {
	static LogbookProfileLink: string = concept2Destinations.profile.target;
	static LogbookLogLink: string = concept2Destinations.log.target;
	static Logbook2kLink: string = concept2Destinations["2k"].target;
	static Logbook5kLink: string = concept2Destinations["5k"].target;
	static Logbook10kLink: string = concept2Destinations["10k"].target;
	static Logbook1hLink: string = concept2Destinations["1h"].target;
}

export default Rowing;
