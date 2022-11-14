
let requestURL = 'https://quizzserv.herokuapp.com//quizz';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.setRequestHeader('Access-Control-Allow-Origin','*');

request.setRequestHeader('Content-type','application/json');
request.setRequestHeader('Access-Control-Allow-Methods','GET');
request.responseType = 'json';
request.send();

request.onload = function() {
	let quiz = request.response;


var quizApp = function() {


	this.score = 0;		
	this.qno = 1;
	this.currentque = 0;
	var totalque = quiz.length;

	
	this.displayQuiz = function(cque) {
		this.currentque = cque;
		if(this.currentque <  totalque) {
			$("#tque").html(totalque);
			$("#previous").attr("disabled", false);
			$("#next").attr("disabled", false);
			
			$("#qid").html(quiz[this.currentque].id + '.');
	
			
			$("#question").html(quiz[this.currentque].question);	
			 $("#question-options").html("");
			for (var key in quiz[this.currentque].options[0]) {
			  if (quiz[this.currentque].options[0].hasOwnProperty(key)) {
		
				$("#question-options").append(
					"<div class='form-check option-block'>" +
					"<label class='form-check-label'>" +
							  "<input type='radio' class='form-check-input' name='option'   id='q"+key+"' value='" + quiz[this.currentque].options[0][key] + "'><span id='optionval'>" +
								  quiz[this.currentque].options[0][key] +
							 "</span></label>"
				);
			  }
			}
		}
		if(this.currentque <= 0) {
			$("#previous").attr("disabled", true);	
		}
		if(this.currentque >= totalque-1) {
				$('#next').attr('disabled', true);
				for(var i = 0; i < totalque; i++) {
					this.score = this.score + quiz[i].score;
				}
			return this.showResult(this.score);	
		}
	}
	
	this.showResult = function(scr) {
		$("#result").addClass('result');
		$("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr  + '/' + totalque + "</h1>");
		for(var j = 0; j < totalque; j++) {
			var res;
			if(quiz[j].score == 0) {
					res = '<span class="wrong">' + quiz[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
			} else {
				res = '<span class="correct">' + quiz[j].score + '</span><i class="fa fa-check c-correct"></i>';
			}
			$("#result").append(
			'<div class="result-question"><span>Q ' + quiz[j].id + '</span> &nbsp;' + quiz[j].question + '</div>' +
			'<div><b>Correct answer:</b> &nbsp;' + quiz[j].answer + '</div>' +
			'<div class="last-row"><b>Score:</b> &nbsp;' + res +
			
			'</div>' 
			
			);
			
		}
	}
	
	this.checkAnswer = function(option) {
		var answer = quiz[this.currentque].answer;
		option = option.replace(/\</g,"&lt;")   //for <
		option = option.replace(/\>/g,"&gt;")   //for >
		option = option.replace(/"/g, "&quot;")

		if(option ==  quiz[this.currentque].answer) {
			if(quiz.JS[this.currentque].score == "") {
				quiz[this.currentque].score = 1;
				quiz[this.currentque].status = "correct";
		}
		} else {
			quiz[this.currentque].status = "wrong";
		}
		
	}	
	 
	this.changeQuestion = function(cque) {
			this.currentque = this.currentque + cque;
			this.displayQuiz(this.currentque);	
			
	}
	
}


var jsq = new quizApp();

var selectedopt;
	$(document).ready(function() {
			jsq.displayQuiz(0);		
		
	$('#question-options').on('change', 'input[type=radio][name=option]', function(e) {

			$(this).prop("checked", true);
				selectedopt = $(this).val();
		});
		
			
			 
	});

	
	
	
	$('#next').click(function(e) {
			e.preventDefault();
			if(selectedopt) {
				jsq.checkAnswer(selectedopt);
			}
			jsq.changeQuestion(1);
	});	
	
	$('#previous').click(function(e) {
		e.preventDefault();
		if(selectedopt) {
			jsq.checkAnswer(selectedopt);
		}
			jsq.changeQuestion(-1);
	});	

}

