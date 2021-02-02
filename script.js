


const X_CLASS='x';
const CIRCLE_CLASS='circle';
let circleTurn
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board');
const WinningMessageTextElement=document.querySelector('[data-winning-message-text]');
const WinningMessageElement=document.getElementById('winning-message');
const restartButton=document.getElementById('restart-Button');

restartButton.addEventListener('click',startGame);

const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
startGame()

function startGame(){
    
    circleTurn=false;
    
    cellElements.forEach(cell=>{
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.addEventListener('click',handleClick,{once:true })
        
    })  
    setBoardHoverClass()
    WinningMessageElement.classList.remove('show');
}


function handleClick(e){
    const cell=e.target;
    
    const currentClass=circleTurn ? CIRCLE_CLASS : X_CLASS;
    
    //placeMark
    placeMark(cell,currentClass)
      //check for win
    if(checkWin(currentClass)){
        console.log('winner');
       endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    
    else{
         //switch turns
        swapTurns()
        setBoardHoverClass()
    }
    
  
   
 
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    
    
}
function swapTurns(){
    circleTurn =!circleTurn;
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
        
    }
    else{
        board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
           return cellElements[index].classList.contains(currentClass)
        })
    })
    
}
function isDraw(){
   return [...cellElements].every(cell=>{
       
       return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS);
    })
}
function endGame(show){
    if(show){
        WinningMessageTextElement.innerHTML="Draw";
        WinningMessageElement.classList.add('show');
    }
    else{
        WinningMessageTextElement.innerHTML=`${circleTurn ? "O's":"X's"} Wins!`;
        WinningMessageElement.classList.add('show');
        
    }
}
