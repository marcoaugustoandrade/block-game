let color = "white"
let computerDraw = []
let myDraw = []

function setCurrentColor(c){
    color = c
    console.log('Selected color: ' + c)
}

function setElementColor(e){
    e.srcElement.style.fill = color
    myDraw[e.srcElement.id] = color
    verifyDraw()    
}

function clearBoard(board){
    
    setCurrentColor('white')
    board.innerHTML = ''
    drawBoard()
}

function verifyDraw(){
    if (myDraw.every((value, index) => value === computerDraw[index])){
        alert('acertou miseravi!')
    }
}

function printDraw(){
    let d = ""
    myDraw.forEach(i => {
        d = d + "\"" + i + "\","
    })
    console.log(d)
}

function drawElement(x, y, width, height, board, mode, position){

    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttributeNS(null, 'x', y)
    rect.setAttributeNS(null, 'y', x) //Inverti o x com y
    rect.setAttributeNS(null, 'width', width)
    rect.setAttributeNS(null, 'height', height)
    rect.setAttributeNS(null, 'stroke', '#000')
    rect.setAttributeNS(null, 'stroke-width', '2')
    
    if (!mode){
        rect.setAttributeNS(null, 'id', position)
        rect.setAttributeNS(null, 'fill', 'white')
        myDraw.push('white')
        rect.addEventListener('click', (e) => {
            setElementColor(e)
        })
    } else {
        rect.setAttributeNS(null, 'fill', computerDraw[position])
    }

    board.appendChild(rect)
}


function drawBoard(board, mode){
    
    let x = 0
    for (let i = 0; i < 400; i=i+40){
        for (let j = 0; j < 400; j=j+40){
            drawElement(i, j, 40, 40, board, mode, x)
            ++x
        }
    }
}

function loadDraw(file){
    
    fetch(file + '.json')
        .then(response => 
            response.json()
            .then(data => {
                computerDraw = []
                computerDraw = data
                myDraw = []
            })
            .then(() => {
                drawBoard(board1, true)
                drawBoard(board2, false)
            })
        )
}

let files = ['cat', 'frog', 'duck', 'lula', 'airplane', 'farol', 'boat', 'house']
function newGame(){
    
    let randomFile = files[Math.floor(Math.random() * files.length)]
    loadDraw(randomFile)
}
    
let board1 = document.querySelector('#board1')
let board2 = document.querySelector('#board2')

newGame()