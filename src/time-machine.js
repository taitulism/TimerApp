const TM = {
	getNow () {
		return +(new Date());
	},
	getClockValues () {
		const now = new Date();

		const HH = now.getHours();
		const MM = now.getMinutes();
		const SS = now.getSeconds();

		return [HH, MM, SS];
	},
	pad (num) {
		if (num < 10) {
			return '0' + num;
		}

		return String(num);
	},
};

export default TM;