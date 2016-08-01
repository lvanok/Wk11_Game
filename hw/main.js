var prompt = require('prompt');
var colors = require("colors/safe");
var student = require('./student.js')
var Bus = require('./bus.js')

myBus = new Bus('Mamun', 'yellow', 'a lot');

prompt.start();

console.log('\nWelcome to your bus!\nIt\'s currently empty. What would you like to do?\n(Press enter to view commands)');

 var schema = {
    properties: {
      name: {
      	description: 'Name',
      	type: 'string',
        required: true,
        message: 'Please enter a name'
      },
      gender: {
      	description: 'Gender',
      	type: 'string',
      	pattern: /^(m|f)$/i,
      	required: true,
      	message: '\'M\' or \'F\''
      },
      grade: {
      	description: 'Grade',
      	type: 'string',
      	pattern: /(^[1][0-2]$|^[1-9]$)/,
      	required: true,
      	message: 'Enter a valid grade (1 - 12)'
      }, GPA: {
      	description: 'GPA',
      	type: 'string',
      	pattern: /(^[1-3]\.[0-9]$|^[1-4]$)/,
      	required: true,
      	message: 'Enter a valid GPA (1.0 - 4)'
      }, detentions: {
      	description: 'Detentions',
      	type: 'string',
      	pattern: /^[0-9][0-9]$|^[0-9]$/,
      	required: true,
      	message: 'Enter 0 - 99'
      }, sleeping: {
      	description: 'Does the student sleep in class',
      	type: 'boolean',
      	required: true,
      	message: 'Enter true or false'
      }, phrase: {
      	description: 'student\'s catchphrase',
      	type: 'string',
      	required: true
      }
    }
  };

var execute = {
	
	action: function() {
		prompt.get([{
 			name: 'action',
		    description: colors.cyan('Next action'),
    		type: 'string'
		}], function(err, result){
			var action = result['action'];
			action = action.toLowerCase();
			switch(action) {
				case 'add student': busActions.addStudent(); break;
				case 'view bus': busActions.viewBus(); break;
				case 'bus chatter': busActions.chatter(); break;
				case 'view student': busActions.accessStudent(false); break;
				case 'remove student': busActions.accessStudent(true); break;
				default: console.log(colors.blue('Commands:\n')+colors.bold('add student: ')+'Adds a student to the bus.\n'+colors.bold('view bus: ')+'Shows all students on the bus.\n'+colors.bold('view student: ')+'Shows information on a student.\n'+colors.bold('bus chatter: ')+'Listen to the bus chat!\n'+colors.bold('remove student: ')+'Kick a student off the bus by name.'); execute.action();
			}
		})
	}
}

var busActions = {
	full: 0,
	addStudent: function(){
		prompt.get(schema, function(err, result){
			if (busActions.full < 10) {
				busActions.full++;
				var newGuy = new student(result.name, result.gender, Number(result.grade), Number(result.GPA), Number(result.detentions), result.sleeping, result.phrase)
				myBus.studentEntersBus(newGuy)
				console.log(colors.green(result.name+' was added to the bus!'))
				execute.action();
			} else {console.log('The bus is full!')}
		})
	},
	viewBus: function(){
		if (myBus.studentsOnTheBus.length <= 0) {
			console.log('The bus is empty.')
		} else{
			for (var i = 0; i < myBus.studentsOnTheBus.length; i++) {
				console.log('Seat #'+(i+1)+ ': ' + myBus.studentsOnTheBus[i].name)
			}
		}
		execute.action();
	},
	accessStudent: function(remove){
		if (myBus.studentsOnTheBus.length <= 0) {
			console.log('The bus is empty.');
			execute.action();
		} else {
			prompt.get([{
				name: 'student',
				description: 'what is the student\'s name? (\'exit\' to exit)',
				type: 'string'	
			}], function(err, result) {
				var found = false;
				var target = result.student;
				if (target == 'exit') {execute.action()};
				for (var i = 0; i < myBus.studentsOnTheBus.length; i++) {
					if(target.toLowerCase() == myBus.studentsOnTheBus[i].name.toLowerCase()) {
						found = true;
						if (remove) {
							console.log(colors.red(myBus.studentsOnTheBus[i].name+ ' has been kicked off the bus. He yells \''+myBus.studentsOnTheBus[i].catchPhrase+'\' as he walks away.')); 
							myBus.studentsOnTheBus.splice(i,1); 
						} else {
							console.log(colors.green('^^^^^\nName: '+myBus.studentsOnTheBus[i].name+'\nGender: '+myBus.studentsOnTheBus[i].gender+'\nGrade: '+myBus.studentsOnTheBus[i].grade+'\nGPA: '+myBus.studentsOnTheBus[i].gpa+'\nDetentions: '+myBus.studentsOnTheBus[i].detentions+'\nSleeps in class: '+myBus.studentsOnTheBus[i].sleepingInClass+'\nCatch Phrase: '+myBus.studentsOnTheBus[i].catchPhrase+'\n^^^^^^^^^^'));
						} 
						busActions.accessStudent();
					}
				} if (!found) {
					console.log(colors.red(target + ' is not on the bus. Call the principal.')); 
					busActions.accessStudent(remove);
				}

			})
		}
	},
	chatter: function(){
		phraseArray = myBus.busChatter();
		for (var i = 0; i < phraseArray.length; i++) {
			console.log(colors.rainbow(phraseArray[i]))
		}
		execute.action();
	}
}

execute.action()