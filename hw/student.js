var Student = function(name, gender, grade, GPA, detentions, sleepingInClass, catchPhrase){
	this.name = name;
	this.gender = gender;
	this.grade = grade;
	this.gpa = GPA;
	this.detentions = detentions;
	this.sleepingInClass = sleepingInClass;
	this.catchPhrase = catchPhrase;
	this.canStudentHaveFun = function(){
		if (this.detentions< 10 && this.gpa > 2) {
			return this.name+': '+this.catchPhrase;
		} else {return 'failing student is silent'}
	}
}

module.exports = Student;