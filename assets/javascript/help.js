$(document).ready(function() {

	//GLOBAL VAR
	var currentQ;		//Used for Displaying Currently being used Info

	var correctAnswer;	// ------------------
	var wrongAnswer;	//Score Count
	var unanswered;		// ------------------

	var answered; 		//Used as Boolean
	
						//=============
	var seconds;		//TIMER
	var time;			//=============
	
	var userChoice;		// User Input

	var text = {
		correct: "Crikey! Good Job, Mate!",
		incorrect: "Aww, wrong answer, you'll get it next time..",
		noTime: "Out here, you've got to be quicker than that!",
		done: "Wasn't too bad, now was it?",
	};

	var triviaQuestions = [
		{	
			question: "Which mammal has the largest claws?",
			choices: ["Tiger", "Grizzly Bear", "Sloth", "Lion", "Cheetah"],
			correct: 1,
			image: "assets/images/grizzly.gif",
			answerText: "The arctos horribilis (Grizzly Bear) uses its large claws, which grow up to 15cm long, to catch food and to defend itself if need be! Hence the name..",
		},

		{
			question: "What is the average lifespan of large crocodiles in the wild?",
			choices: ["25 years", "45 years", "70 years", "90 years", "120 years"],
			correct: 2,
			image: "assets/images/croc.gif",
			answerText: "The average lifespan of large, wild crocodiles is 70 years.. I guess your grandpa is older than a dinosaur!",
		},

		{
			question: "Which bird has the longest wingspan?",
			choices: ["Albatross", "Black Vulture", "Bald Eagle", "Pelican", "Owl"],
			correct: 0,
			image: "assets/images/albatross.gif",
			answerText: "The Wandering Albatross has the wingspan between 8.2-11.5 ft! The largest of any living bird.",
		},

		{
			question: "Which of these land mammals weighs roughly 7.8k lbs?",
			choices: ["Asian Elephant", "Giraffe", "White Rhino", "Hippo", "Whale Shark"],
			correct: 2,
			image: "assets/images/rhino.gif",
			answerText: "The White Rhino weighs up to 7,800 lbs - a tad over half of what an African Elephant weighs (14k lbs)..",
		},
		{
			question: "Which member of the big cat family (Felidae) is most social?",
			choices: ["Jaguar", "Cougar", "Cheetah", "Eurasian Lynx", "Lion"],
			correct: 4,
			image: "assets/images/lion.gif",
			answerText: 'The Lion is the only social member of the cat family, they live in large groups called "prides" - but I could see why you\'d think it was the Cougar..',
		},
		{
			question: "At about what speed can a Hippo run on land?",
			choices: ["5 mph", "12 mph", "18 mph", "25 mph", "27 mph"],
			correct: 2,
			image: "assets/images/hippo.gif",
			answerText: 'Yep, hippos can be run pretty fast, and they\'re quite deadly too - well not THIS one. The name hippopotamus means "river horse."'
		},
		{
			question: "Which of these produces the loudest sound of any animal?",
			choices: ["Sperm Whale", "Tiger Pistol Shrimp", "Howler Monkey", "Grey Wolf", "North American Bullfrog"],
			correct: 0,
			image: "assets/images/spermWhale.gif",
			answerText: "The Sperm Whale produces communicative clicks that are around 230 dB. A space shuttle launches exhaust, approximately 3 miles per second - at 215 dB..."
		},
	];

	// Hides Content at Start Up  
	$("#gameArea").hide();

	// Start Button Click and Hide
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	// ======================================================
	//Function to Start Game After Initial Click
	// ======================================================
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}
	// ==================
	// Displays Question
	// ==================
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		// Prints Question from Array
		$(".question").html(triviaQuestions[currentQ].question);

		// -----------------------------------------
		//Loops through possible choices and appends
		// -----------------------------------------
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

		//Calls Timer
		countdown();

		// USERCLICK
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// ==================
	// TIMER COUNTDOWN
	// ==================
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// ==================
	// SHOWS TIMER
	// ==================
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// ====================================
	// DISPLAYS ANSWER DIV
	// ====================================
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		// GIF TEXT
      // var gifText = triviaQuestions[currentQ].answerText;
      // 	newCap = $("<div>");
      // 	newCap.html(gifText);
      // 	newCap.addClass("gifCap");
      // 	$("#gifText").html(newCap);


		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});