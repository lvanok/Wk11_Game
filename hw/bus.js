var Bus = function(driverName, color, gas) {
	this.studentsOnTheBus = [];
	this.driverName = driverName;
	this.color = color;
	this.gas = gas;
	this.studentEntersBus = function(who){
		this.studentsOnTheBus.push(who)
	}
	this.busChatter = function(){
		var catchPhrases = [];
		for (var i = 0; i < this.studentsOnTheBus.length; i++) {
			catchPhrases.push(this.studentsOnTheBus[i].canStudentHaveFun());
		}
		return catchPhrases;
	}
}

module.exports = Bus;