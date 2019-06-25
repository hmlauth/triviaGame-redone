/* TODO: 
    1. Add styling
    2. Display timer for each question
    3. Build out questions
    4. Add photos
    5. Add music
*/
 
// GLOBAL VALUES
const game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  tempCorrect: 0,
  tempIncorrect: 0,
  questionsAndAnswers: [
    { 
        q: "Jim thinks Michael is eating ice cream for breakfast, but he's actually eating sour cream and sprinkles.", 
        a:  false,
        ca: 'Mayonnaise and black olives',
        img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-05/9/6/enhanced/webdr05/enhanced-28316-1462791450-1.jpg?downsize=700:*&output-format=auto&output-quality=auto'
    },
    { 
        q: "According to Dwight, nostalgia is one of the greatest human weaknesses, second only to human eyes.", 
        a:  false,
        ca: 'The neck',
        img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-05/9/8/enhanced/webdr11/enhanced-7560-1462798064-1.png?downsize=700:*&output-format=auto&output-quality=auto'
    },
    { 
        q: "According to 'Prison Mike', the worst thing about prison is the demetors.", 
        a: true,
        ca: 'The dementors',
        img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-05/9/5/enhanced/webdr08/enhanced-10697-1462787992-8.png?downsize=700:*&output-format=auto&output-quality=auto'
    },
    {
        q: 'Michael picks the username HappyCuddler when he signs up for an online dating site.',
        a: false,
        ca: 'LittleKidLover',
        img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-05/9/5/enhanced/webdr07/enhanced-17389-1462787774-1.jpg?downsize=700:*&output-format=auto&output-quality=auto'
    },
    {
        q: "Erin's real first name is Kelly.",
        a: true,
        ca: 'Kelly',
        img: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-05/9/9/enhanced/webdr01/enhanced-24956-1462801225-6.jpg?downsize=700:*&output-format=auto&output-quality=auto'
    }
  ],
  startGame: function() {
    this.correct = 0;
    this.incorrect = 0;
    this.unanswered = 0,
    this.loopQuestions(this.questionsAndAnswers); // loop through questions
  },
  loopQuestions: function(arr) {
    this.displayQuestions(arr, 0); // add HTML to each question
    // once displayQuestions and done iterating through each questions and updatin the score, it will return true. When true, we will displayScore.
  },
  displayQuestions: function(arr, i) { // add HTML to each question
    if (i === 0) {
        game.packageQuestions(arr, i); // add buttons and functionality
        game.displayQuestions(arr, i+1); // add elements to page
        game.scoreQuestion(); // add functionality to button, returns score
        game.updateScore(); // update total score
    } else if (i < arr.length) {
      setTimeout(function() { // set timer for 5 seconds per question
        game.packageQuestions(arr, i);
        game.displayQuestions(arr, i+1);
        game.scoreQuestion(); // add functionality to button, updates temp score
        game.updateScore(); // updates final score with temp score
      }, 5000);
    } else if (i === arr.length) {
        setTimeout(function() {
            game.updateScore(); // updates final score with temp score
            game.displayScore() // displays score
        }, 5000)
    }
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
  disableBtn(input, element) {
    input.prop('disabled', true); // disable true btn
    $(element).prop('disabled', false); // other option active
    input.attr('click', true); // true btn clicked
    $(element).attr('click', false); // false btn option not clicked
  },
  checkAnswer(input) {
    let userChoice = input.data("type"); // selected button
    let answer = input.data("answer"); // actual answer
    if (userChoice) {
        game.disableBtn(input, '.btn-false');
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
        game.disableBtn(input, '.btn-true')
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
  },
  scoreQuestion: function() { // add functionality to button, returns score

    $(".answer-btn").on("click", function() {
        game.checkAnswer($(this));
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
  writeStats: function() { // print score whenever called
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
