$(document).ready(function() {

    var currectQuestion;
    var correctAnswer;
    var wrongAnswer;
    var unanswered;
    var answered;
    var seconds;
    var time;
    var userChoise;

    var text = {
        correct:"Yehi! Good Job",
        incorrect: "Wrong answer! Good luke next time",
        noTime:"you've got to be quicker",
        done: "It is done",
    };

var triviaQuestions = [{ 
        question:  "In what year did the American animated sitcom 'The Simpson' make its debut?",
        choices: ["1987"," 1990", "1996", "1993" ],
        correct: 0,
        image: "assets/images/simpsons1987.gif",
    },{ 
        question:  "What is the name of Lisa Simpson's favorite doll? ",
        choices: ["Malibu Princess","Malibu Julie", "Malibu Francis", "Malibu Stacy" ],
        correct: 3,
        image: "assets/images/malibu.gif",
    },{ 
        question:  "What name is given to the three-eyed fish in the third episode of the first season 'Homer's Odyssey'?",
        choices: ["Winky","Blinky", "Minky", "Stinky" ],
        correct: 1,
        image: "assets/images/Blinky.gif",
    },{ 
        question:  "Who do Legs and Louie work for in the Simpsons? ",
        choices: ["Apu","Willie", "Fat Tony", "Mr. Burns" ],
        correct: 2,
        image: "assets/images/FatTony.gif",
    },{ 
        question:  "Who is fired from his job due to Homer getting food poisoning in season five? ",
        choices: ["Smithers","Lenny", "Apu", "Karl" ],
        correct: 2,
        image: "assets/images/apu.gif",
    },{ 
        question:  "What is the Simpsons' dog's name",
        choices: ["Santa's Little Helper reindeer","Santa's Little helper", "Santa's Little snowball", " Santa's Little dog" ],
        correct: 1,
        image: "assets/images/littleHelper.gif",
    },{ 
        question:  "What is Krusty the Clown's monkey's name",
        choices: ["Mr. monkey","Mr. Jeeny", "Mr. Teen", "Mr. Teeny" ],
        correct: 3,
        image: "assets/images/tenny.gif",
    },{ 
        question:  "Ralph's last name is which of these?",
        choices: ["Syslak","Bouvier", "Burns", "Wiggum" ],
        correct: 3,
        image: "assets/images/Ralph.gif",
    },{ 
        question:  "What 'Simpsons' character has a full set of five fingers?",
        choices: [" Apu","Lenny", "God", "Bob Patino" ],
        correct: 2,
        image: "assets/images/god.gif",
        
    },{ 
        question:  "Which of these is the name of a highway that runs through the town of Springfield?",
        choices: ["Bing Crosby Expressway","Tom Jones Expressway", "Mick Jagger Expressway", " Michael Jackson Expressway" ],
        correct: 3,
        image: "assets/images/expressway.gif",
    }
];

// Hide the content of the game. 
$("#gameArea").hide();

//Start the game with the button start. 
$("#startBtn").on("click",function() {
    $("#startGame").hide();
    newGame();
});

//Reset the game. 
$("#startOverBtn").on("click",function(){
    $("#results").hide();
    newGame();
});

function newGame() {
    $("#gameArea").show();
    $("#answers").hide();
    $("#results").hide();
    correctAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;
    currectQuestion = 0;
    questions();
}


// Show the questions. 


function questions() {
    $("#answers").hide();
    $("#questions").show();
    answered = true;
    $(".question").html(triviaQuestions[currectQuestion].question);

    for (var i = 0; i < 4; i++){
    var list = $("<div>");
    list.text(triviaQuestions[currectQuestion].choices[i]);
    list.attr({"data-index": i});
    list.addClass("thisChoise");
    $(".choices").append(list);
    }


    //Show timer.
    countdown();

    //When the user click!
    $(".thisChoise").on("click",function(){
        userChoise = $(this).data("index");
        console.log(userChoise);
        
        clearInterval(time);
        showAnswer();
    });
}

function countdown() {
    seconds = 20;
    $("#time").html("00:" + seconds);
    answered = true;
    //Delay of 1 sec before timer goes off
    time = setInterval(countdownShow, 1000);
}


function countdownShow() {
    seconds --;
    if (seconds < 10) {
        $("#time").html("00:0" + seconds);
        $("#time").css({"color": "purple"});
    }else {
        $("#time").html("00:0" + seconds);
        $("#time").css({"color": "blue"});
    }

    if (seconds < 1) { 
        clearInterval(time);
        answered = false;
        showAnswer();
    }
}

function showAnswer(){
    $("#questions").hide();
    $("#results").hide();
    $("#answers").show();
    $(".thisChoise").empty();

    var rightAnswerText = triviaQuestions[currectQuestion].choices[triviaQuestions[currectQuestion].correct];
    var rightAnswerIndex = triviaQuestions[currectQuestion].correct;
    console.log(rightAnswerText);
    console.log(rightAnswerIndex);

    var gitLink = triviaQuestions[currectQuestion].image;
    var giffy = $('<img>');
    giffy.attr("src",gitLink);
    giffy.addClass("gifImag");
    $("#gif").html(giffy);

   if ((userChoise === rightAnswerIndex) && (answered === true)){
       correctAnswer ++;
       $("#text").html(text.correct);
       $("#correctAnswer").hide();
   } else if ((userChoise !== rightAnswerIndex ) && (answered ===  true)) {
       wrongAnswer ++;
       console.log(wrongAnswer);
       
       $("#text").html(text.incorrect);
       $("#correctAnswer").show().html("the correct asnwer was: " + triviaQuestions[currectQuestion].choices[rightAnswerIndex]);
      
   }else {
       unanswered ++;
       $("#text").html(text.noTime);
       $("#correctAnswer").show().html("the correct asnwer was: " + triviaQuestions[currectQuestion].choices[rightAnswerIndex]);
       answered = true;
   }

   if (currectQuestion === (triviaQuestions.length - 1)) {
        setTimeout(results, 1000);

    } else {
       currectQuestion ++;
       setTimeout (questions, 2000);
   }
}


function results () {
    $("#results").show();
    $("#answers").hide();
    $("#questions").hide();
    $("#resultText").html(text.done);
    $("#correctAnswers").html("Correct Answers: " + correctAnswer);
    $("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
	$("#unanswered").html("Didn't Answer: " + unanswered);
	$("#startOverBtn").show();
	$("#startOverBtn").html("RESTART GAME");
}




});