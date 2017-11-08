angular.module('codecc.controllers', [])

.controller('LoginController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
    UserService.me().then(function() {
        redirect();
    });
        
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }

}])

.controller('SignupController', ['$scope', 'User', function($scope, User) {

    $scope.createUser = function() {
        var u = new User($scope.newUser);
        u.$save(function() {
            $scope.newUser = {};
            // $scope.users = User.query();
        });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }
}])

.controller('HomeController', ['$scope', 'Post', '$location', function($scope, Post, $location) {
    $scope.posts = Post.query();
    //later $scope.posts by followers
     
    $scope.save = function() {
        var p = new Post($scope.post);
        p.$save(function() {
            $location.path('/home');
        }, function(err) {
            console.log(err);
        });
    }
}])

.controller('PostReplyController', ['$scope', '$routeParams', '$location', '$resource', 'Post', 'Reply', function($scope, $routeParams, $location, $resource, Post, Reply) {
    
    $scope.post = Post.get({ id: $routeParams.id });
    $scope.replies = Reply.query({ id: $routeParams.id });

    $scope.edit = function() {
        $location.path('/' + $routeParams.id + '/update');
    }

    $scope.savePost = function() {
        // console.log($scope.post);
        $scope.post.$update(function() {
            $location.replace().path('/' + $routeParams.id);
        });
        // $scope.post.$update();
    }
    $scope.deletePost = function() {
        if (confirm('Are you sure you want to delete this post?')) {
            $scope.post.$delete(function() {
                $location.replace().path('/home');
            });
        }
    }

    $scope.saveReply = function() {
        var r = new Reply($scope.reply);
        r.$save(function() {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    }
}])
.controller('BootcampsController', ['$scope', '$routeParams','$resource', 'Bootcamp', 'User', '$location', function($scope, $routeParams, $resource, Bootcamp, User, $location) {

    $scope.bootcamps = Bootcamp.query();

    $scope.save = function() {
        var p = new Bootcamp($scope.bootcamps);
        p.$save(function() {
            $location.path('/bootcamps');
        }, function(err) {
            console.log(err);
        });
    }
}])
.controller('OneBootcampController', ['$scope', '$routeParams','$resource', 'Bootcamp', 'User', 'Review', '$location', function($scope, $routeParams, $resource, Bootcamp, User, Review, $location) {
    $scope.bootcamp = Bootcamp.get({ id: $routeParams.id });
    $scope.reviews = Review.query({ id: $routeParams.id });
}])
.controller('CareersController', ['$scope', function(scope) {
    // <!-- CAREERS SCRIPT -->
   
      // Get input element
      let filterInput = document.getElementById('list');
      // Add event Listner
      filterInput.addEventListener('change', filterNames);
    
      function filterNames() {
        // Get value of input
        let filterValue =
          document.getElementById('list').value.toUpperCase();
    
        // Get names ul
        let ul = document.getElementById('names');
        //get li's from ul
        let li = ul.querySelectorAll('li.collection-item');
    
        //Loop through collection-item Li's
        for (let i = 0; i < li.length; i++) {
          let a = li[i].getElementsByTagName('a')[0];
          //If matched
          if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = '';
          } else {
            li[i].style.display = 'none';
          }
        }
      }
    
    
}])















// //COLOR GAME CONTROLLER
// .controller('MultichoiceController', ['$scope', 'User', '$location', function($scope, User, $location) {
// var numSquares = 6;
// var colors = [];
// var pickedColor;
// var squares = document.querySelectorAll(".square");
// var colorDisplay = document.getElementById("colorDisplay");
// var messageDisplay = document.querySelector("#message");
// var h1 = document.querySelector("h1");
// var resetButton = document.querySelector("#reset");
// var modeButtons = document.querySelectorAll(".mode");


// init();

// function init() {
//     setupModeButtons();
//     setupSquares();
//     reset();
// }
// var sound = new Howl({
//     src: ['./views/sounds/bubbles.mp3']
  
//   });
//   var sound2 = new Howl({
//     src: ['./views/sounds/strike.mp3']
// });

// var sound3= new Howl({
//     src: ['./views/sounds/zig-zag.mp3']
// });



// function setupModeButtons() {
//     for (var i = 0; i < modeButtons.length; i++) {
//         modeButtons[i].addEventListener("click", function () {
//             modeButtons[0].classList.remove("selected");
//             modeButtons[1].classList.remove("selected");
//             this.classList.add("selected");
//             this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
//             reset();
        
//         });
//     }
// }


// function setupSquares() {
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].addEventListener("click", function () {
//             var clickedColor = this.style.background;
//             if (clickedColor === pickedColor) {
//                 messageDisplay.textContent = "Correct!";
//                 resetButton.textContent = "Play Again?"
//                 changeColors(clickedColor);
//                 h1.style.background = clickedColor;
//                 sound.play(); 
                
                
//             } else {
//                 this.style.background = "#232323";
//                 messageDisplay.textContent = "Try Again"
//                 sound2.play();
//             }
//         });
//     }
// }

// function reset() {
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     resetButton.textContent = "New Colors"
//     messageDisplay.textContent = "";
//     for (var i = 0; i < squares.length; i++) {
//         if (colors[i]) {
//             squares[i].style.display = "block"
//             squares[i].style.background = colors[i];
//         } else {
//             squares[i].style.display = "none";
           
//         }
//     }
//     h1.style.background = "steelblue";
// }

// resetButton.addEventListener("click", function () {
//     reset(); sound3.play();
    
    
// })

// function changeColors(color) {
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].style.background = color;
//     }
// }

// function pickColor() {
//     var random = Math.floor(Math.random() * colors.length);
//    return colors [random];

// }

// function generateRandomColors(num) {
//     var arr = []
//     for (var i = 0; i < num; i++) {
//         arr.push(randomColor())
//     }
//     return arr;
// }

// function randomColor() {
//     //pick a red from 0 - 255
//     var r = Math.floor(Math.random() * 256);
//     //pick a green from  0 -255
//     var g = Math.floor(Math.random() * 256);
//     //pick a blue from  0 -255
//     var b = Math.floor(Math.random() * 256);
//     return "rgb(" + r + ", " + g + ", " + b + ")";
// }
// }])














// MULTICHOICE CONTROLLER
.controller('MultichoiceController', ['$scope', '$resource', 'User', '$location', function($scope, $resource, User, $location) {

    (function() {
    
var myQuestions = [
    {
        question: "Which language is most know for styling our websites?",
        answers: {
            a: "JavaScript",
            b: "CSS",
            c: "AngularJS"
        },
        correctAnswer: "b"
    },
    {
        question: "What does OOP stand for?",
        answers: {
            a: "Object-oriented Programming",
            b: "Online Operating Procedure",
            c: "Overly-optimistic Programmer"
        },
        correctAnswer: "a"
    },
    {
        question: "How is an array composed?",
        answers: {
            a: "Curly brackets {}",
            b: "Parentheses ()",
            c: "Square brackets []"
        },
        correctAnswer: "c"
    },
    {
        question: "What best describes the boolean datatype?",
        answers: {
            a: "True/False",
            b: "Positive/Negative",
            c: "Up/Down/All-around"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the PUT method synonymous with?",
        answers: {
            a: "Creating",
            b: "Updating",
            c: "Deleting"
        },
        correctAnswer: "b"
    },
    {
        question: "Where is Node.js utilized?",
        answers: {
            a: "Backend",
            b: "Frontend",
            c: "MySQL"
        },
        correctAnswer: "a"
    },
    {
        question: "What does the p element represent?",
        answers: {
            a: "Python",
            b: "Paragraph",
            c: "Parser"
        },
        correctAnswer: "b"
    },
    {
        question: "Why do we use console.log?",
        answers: {
            a: "Debugging purposes",
            b: "Because it's so much fun",
            c: "To add functionality"
        },
        correctAnswer: "a"
    },
    {
        question: "What does it mean when we receive a 500 HTTP Status Code?",
        answers: {
            a: "OK",
            b: "Unauthorized",
            c: "Internal Server Error"
        },
        correctAnswer: "c"
    },
    {
        question: "How do we incorporate our CSS styling into our HTML file?",
        answers: {
            a: "By adding a span element within the body",
            b: "By adding a link element within the head",
            c: "By adding a script element with a paragraph"
        },
        correctAnswer: "b"
    }
];
function buildQuiz() {
    var output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll(".answers");
    var numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");

  buildQuiz();

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  var currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
}])

















// COLOR GAME CONTROLLER
.controller('ColorGameController', ['$scope', '$resource', 'User', '$location', function($scope, $resource, User, $location) {

var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}
var sound = new Howl({
    src: ['./views/sounds/bubbles.mp3']
  
  });
  var sound2 = new Howl({
    src: ['./views/sounds/strike.mp3']
});

var sound3= new Howl({
    src: ['./views/sounds/zig-zag.mp3']
});



function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        
        });
    }
}


function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                sound.play(); 
                
                
            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again"
                sound2.play();
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block"
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
           
        }
    }
    h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
    reset(); sound3.play();
    
    
})

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
   return colors [random];

}

function generateRandomColors(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
        arr.push(randomColor())
    }
    return arr;
}

function randomColor() {
    //pick a red from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a green from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
}]);