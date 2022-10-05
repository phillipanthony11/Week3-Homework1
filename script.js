const questionBoxElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonElemnt = document.getElementById('clicked-button')

var startButton = document.querySelector('#startbutton');
var cont1 = document.getElementById('containerOne')
var cont2 = document.getElementById('containerTwo')
var cont3 = document.getElementById('containerThree')
var cont4 = document.getElementById('containerFour')
var cont5 = document.getElementById('containerFive')
var cont6 = document.getElementById('containerSix')
var cont7 = document.getElementById('containerSeven')
var cont8 = document.getElementById('containerEight')
var secondsLeft= 50;
var timeEl = document.querySelector(".timer")
var containers = document.querySelectorAll('.container')
var responseButtons = document.querySelectorAll('.response')
var currentContainerIndex = 0 
var restart =document.querySelector('#restartbutton')
var yourScore = document.querySelector("#yourScore")
var submitScore = document.querySelector("#submitScore")
var scores = []
var scoreBoard = document.querySelector("#scoreboard")

console.log(containers)

startButton.addEventListener('click', startGame)


function startGame(){
    var timer = setInterval(
        function() {
                secondsLeft--;
                timeEl.textContent = secondsLeft;
        
                if(secondsLeft === 0 || currentContainerIndex === containers.length-2)  {
                    clearInterval(timer);
                    yourScore.textContent = secondsLeft
                    containers[currentContainerIndex].classList.add('hidden')
                    containers[currentContainerIndex].classList.remove('active')
                    currentContainerIndex = containers.length-2
                    containers[currentContainerIndex].classList.add('active')
                    containers[currentContainerIndex].classList.remove('hidden')
                    sendMessage();
                }
        }, 1000)

    containers[0].classList.add('hidden')
    containers[0].classList.remove('active')
    containers[1].classList.remove('hidden')
    containers[1].classList.add('active')
    currentContainerIndex++
}


function sendMessage ()  {
    timeEl.textContent = 'Game Over';
}


responseButtons.forEach(handleResponse)

function handleResponse(button) {
    button.addEventListener('click', function() {
        if(button.classList.contains('correct')){
            console.log("correct")
        }
        else {
            if(secondsLeft<6){
                secondsLeft = 1
            }
            else {
                secondsLeft = secondsLeft-5
            }
    
        }

        containers[currentContainerIndex].classList.add('hidden')
        containers[currentContainerIndex].classList.remove('active')
        currentContainerIndex++
        containers[currentContainerIndex].classList.remove('hidden')
        containers[currentContainerIndex].classList.add('active')

    })
}
restart.addEventListener('click', restartGame)

function restartGame(){
    containers[currentContainerIndex].classList.add('hidden')
    containers[currentContainerIndex].classList.remove('active')
    secondsLeft=50
    currentContainerIndex = 0
    startGame()
}

function renderScores(){
    scoreBoard.innerHTML = ""
    console.log(scoreBoard)
    for(var i = 0; i<scores.length; i++){
        var scoreIndex = scores[i]
        var listItemn = document.createElement("li")
        listItemn.textContent = scoreIndex.initials +": " + scoreIndex.score
        scoreBoard.appendChild(listItemn)
    }
}

submitScore.addEventListener("click", saveScore)

function saveScore(){
    var initials = document.querySelector("#initials").value
    if(initials.length>0){
        scores.push({initials: initials})
        scores[scores.length-1].score = secondsLeft
        scores.sort((a, b) => b.score - a.score)
        localStorage.setItem("scores", JSON.stringify(scores))
        console.log(scores)
        containers[currentContainerIndex].classList.add('hidden')
        containers[currentContainerIndex].classList.remove('active')
        currentContainerIndex++
        containers[currentContainerIndex].classList.remove('hidden')
        containers[currentContainerIndex].classList.add('active')
        renderScores()
    }
    else {
        alert("Must enter initials")
    }

}

initializeScores()

function initializeScores(){
    var storedScores = JSON.parse(localStorage.getItem("scores"))
    if(storedScores){
        scores=storedScores
    }
}
