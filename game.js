// GLOBAL VALUES
const game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  tempCorrect: 0,
  tempIncorrect: 0,
  questionsAndAnswers: [
    { q: "The sky is blue", a: true },
    { q: "The grass is green", a: true },
    { q: "The world is flat", a: false }
  ],
  startGame: function() {
    console.log(this);
    this.correct = 0;
    this.incorrect = 0;
    this.unanswered = 0,
    this.loopQuestions(this.questionsAndAnswers); // loop through questions
    // this.setTimeout();
  },
  loopQuestions: function(arr) {
    this.displayQuestions(arr, 0); // add HTML to each question
    // once displayQuestions and done iterating through each questions and updatin the score, it will return true. When true, we will displayScore.
  },
  packageQuestions: function(arr, i) {
    $('.card-body').empty();  

    let question = arr[i].q;
    let answer = arr[i].a;
    
    // create html elements for questions and true/false buttons and their div
    let $questionDiv = $("<div>");
    let $p = $("<p>");
    let $trueButton = $("<button>");
    let $falseButton = $("<button>");

    // give question text a class
    $p.addClass("question-text");
    $p.text(question);

    // insert text into buttons and also provide data-answer and data-type for comparison later
    $trueButton.text("True");
    $trueButton.addClass("btn answer-btn btn-success btn-sm btn-true");
    $trueButton.attr("data-answer", answer);
    $trueButton.attr("data-type", "true");
    $falseButton.text("False");
    $falseButton.addClass("btn answer-btn btn-dark btn-sm btn-false");
    $falseButton.attr("data-answer", answer);
    $falseButton.attr("data-type", "false");

    // append everything into one pkg and attach to card-boy
    $p.append($trueButton);
    $p.append($falseButton);
    $questionDiv.append($p);

    return $(".card-body").append($questionDiv);

  },
  displayQuestions: function(arr, i) { // add HTML to each question
    if (i === 0) {
        game.packageQuestions(arr, i); // add buttons and functionality
        game.displayQuestions(arr, i+1); // add elements to page
        game.scoreQuestion(); // add functionality to button, returns score
        game.updateScore(); // update total score
    } else if (i < arr.length) {
      setTimeout(function() {
        game.packageQuestions(arr, i);
        game.displayQuestions(arr, i+1);
        game.scoreQuestion(); // add functionality to button, returns score
        game.updateScore();
      }, 5000);
    } else if (i === arr.length) {
        setTimeout(function() {
            game.updateScore();
            game.displayScore()
        }, 5000)
    }
  },
  scoreQuestion: function() { // add functionality to button, returns score

    $(".answer-btn").on("click", function() {
        
        let userChoice = $(this).data("type"); // selected button
        let answer = $(this).data("answer"); // actual answer

        if (userChoice) {
            $(this).prop('disabled', true); // disable true btn
            $('.btn-false').prop('disabled', false); // other option active
            $(this).attr('click', true); // true btn clicked
            $('.btn-false').attr('click', false); // false btn option not clicked
            if (userChoice === answer) {
                game.tempCorrect = 1;
                game.tempIncorrect = 0;
                game.writeStats()
            } else {
                game.tempCorrect = 0;
                game.tempIncorrect = 1;
                game.writeStats()
            }
        } else if (!userChoice) {
            $(this).prop('disabled', true); // disable false btn
            $('.btn-true').prop('disabled', false); // other option active
            $(this).attr('click', true); // false btn clicked
            $('.btn-true').attr('click', false); // true btn not clicked
            if (userChoice === answer) {
                game.tempCorrect = 1;
                game.tempIncorrect = 0;
                game.writeStats()
            } else {
                game.tempCorrect = 0;
                game.tempIncorrect = 1;
                game.writeStats()
            }
        }
        game.writeStats() // print stats to see what's happening with score
    });
        
  },
  updateScore: function() {
        this.correct += this.tempCorrect;
        this.incorrect += this.tempIncorrect;
        this.tempCorrect = 0;
        this.tempIncorrect = 0;
        game.writeStats()
  },
  displayScore: function() {
    $(".card-body").empty()
    let $row = $('<div class="row">');
    let $col = $('<div class="col">');
    let $pCorrect = $('<p> Correct: ' + this.correct + '</p>');
    let $pIncorrect = $('<p> Incorrect: ' + this.incorrect + '</p>');
    $col.append($pCorrect);
    $col.append($pIncorrect);
    $col.append('<button class="btn btn-dark btn-lg start-game">Restart Game</button>')
    $row.append($col);
    $('.card-body').append($row);
  },
  writeStats: function() {
      console.log('Correct: ', this.correct);
      console.log('Incorrect: ', this.incorrect);
      console.log('tempIncorrect: ', this.tempCorrect);
      console.log('tempIncorrect: ', this.tempIncorrect);
  }
};

// METHODS
$(document).ready(function() {

    $('.card-body').on('click', '.start-game', function() {
        $(".start-game").hide();
        game.startGame();
    })

});
