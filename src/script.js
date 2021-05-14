
const levelCards = document.querySelectorAll('.card')
const initPage = document.getElementById('initPage')
const gameContainer = document.getElementById('game-container')
const playerInput = document.getElementById('playernameinp')

const playername = document.getElementById('playername')
const moves = document.getElementById('moves')
const wins = document.getElementById('wins')

let level;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

levelCards.forEach(element => {
    element.onclick = (ev) => {
        
        if(playerInput.value === '' || playerInput.value === null){

            alert('Informe seu Player Name')
            console.log(`[ ${new Date().toLocaleTimeString()} ] Game Error, Player Name not defined `)
        }else{

        initPage.style.top = '-105vh'
        level = element.getAttribute('data-level')

        gameStart(level, playerInput.value, (level, PlayerName) => {

            console.log(`[ ${new Date().toLocaleTimeString()} ] Game Loaded Difficulty: ${level} PlayerName: ${PlayerName}` )
        })
      }
    }
});

const randomCard = (level) => {

    let lenghtCards = level === 'Hard' ? 16 : 8
    let elementsCards = lenghtCards / 2
    let array = []

    for (let i = 0; i < elementsCards; i++) {

        let imgUrl = `./assets/imgsCard/${i + 1}.png`

        array.push({
            index: i + 1,
            url: imgUrl
        })
        
    }

    return array
}

const gameStart = (initLevel, namePlayer, callback) => {
    
    if(initLevel === 'Hard'){
        gameContainer.classList.add('display-grid_16')
    }else{
        gameContainer.classList.add('display-grid_8')
    }

    let Cards = []
    playername.innerHTML = namePlayer

    randomCard(initLevel).forEach((item, index) => {

        Cards.push(item)
        Cards.push(item)
    })

    shuffleArray(Cards)

    Cards.forEach((item, index) => {
        if(item !== undefined){

            let cardContainer = document.createElement('div')
            cardContainer.classList.add('display-flex')

            let imageCard = document.createElement('img')
            imageCard.setAttribute('src', item.url)

            let backCard = document.createElement('div')
            backCard.classList.add('back-card')
            backCard.innerHTML = '?'

            backCard.addEventListener('click', (ev) => { handleClickCard(ev, namePlayer, initLevel)})
            backCard.setAttribute('index', item.index)

            cardContainer.classList.add('card-container')
            
            cardContainer.appendChild(backCard)
            cardContainer.appendChild(imageCard)
            gameContainer.appendChild(cardContainer)
        }
    })
   
    callback(initLevel, namePlayer)
}

let movesGame = 0
let turnClick = 0
let win = 0

let targetOne = 'one'
let targetTwo = 'two'
let winnerlenght = 0

const resetGame = (level, player) => {

    let cardsContainer = document.querySelectorAll('.card-container')

    cardsContainer.forEach(item => {
        item.remove()
    })

    console.log(`[ ${new Date().toLocaleTimeString()} ] Game Reseted `)

    movesGame = 0
    turnClick = 0
    win = 0

    winnerlenght += 1

    targetOne = 'one'
    targetTwo = 'two'

    wins.innerHTML = winnerlenght

    gameStart(level, player, (level, PlayerName) => {
        console.log(`[ ${new Date().toLocaleTimeString()} ] Game Loaded Difficulty: ${level} PlayerName: ${PlayerName} win: ${winnerlenght}` )
    }) 
}

const getWinner = (level, player, winlgt) => {

    let cardsByLevel = level === 'Hard' ? 8 : 4

    if(cardsByLevel == winlgt){

        console.log(`[ ${new Date().toLocaleTimeString()} ] ${player} Winner `)

        resetGame(level, player)
    }
}


const handleClickCard = (ev, player, level) => {
    turnClick += 1

    ev.target.style.transform = 'rotateY(90deg)'

    if (turnClick == 2) {

        targetTwo = {
            index: ev.target.getAttribute('index'),
            target: ev.target
        }

        if(targetOne.index == targetTwo.index){

        console.log(`[ ${new Date().toLocaleTimeString()} ] ${player} Success Card `)

        turnClick = 0
        win += 1

        console.log(win)
        getWinner(level, player, win)

        targetOne.target.nextSibling.remove()
        targetTwo.target.nextSibling.remove()

        targetOne.target.remove()
        targetTwo.target.remove()


        targetOne, targetTwo = 'one','two'

        }else if(turnClick === 2){

            console.log(`[ ${new Date().toLocaleTimeString()} ] ${player} Missed Card + 1 Move `)

            let allCards = document.querySelectorAll('.back-card')

            allCards.forEach(item => {
                item.classList.add('disabled')
            })

            turnClick = 0
            movesGame += 1
            moves.innerHTML = movesGame
            targetOne, targetTwo = 'one','two'

            setTimeout(() => {
                let backCards = document.querySelectorAll('.back-card')

                backCards.forEach(item => {
                    item.style.transform = 'rotateY(0deg)'
                    item.classList.remove('disabled')
            })
            }, 3000);

        }
    }else{

        targetOne = {
            index: ev.target.getAttribute('index'),
            target: ev.target
            }
    }

}