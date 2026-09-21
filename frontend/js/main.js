import { updatePlayer, drawPlayer } from "./player.js"
import { renderMap, loadMap } from "./map.js"

//Finder canvas elementet i HTML
let canvas = document.querySelector("canvas")

//Sætter vinduets højde & bredde til at være lig med browseren højde og bredde
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

async function startGame() {
    await loadMap()

    window.requestAnimationFrame(gameLoop)
}

let lastTime = 0

function gameLoop(currentTime) {

    window.requestAnimationFrame(gameLoop)

    if (lastTime === 0) {
        lastTime = currentTime

        return
    }

    //Finder forskellen mellem de to og dividerer det med 1000 for at omregne millisekunder til sekunder
    let deltaTime = (currentTime - lastTime) / 1000

    lastTime = currentTime


    updatePlayer(deltaTime)
    renderMap(c, canvas)
    drawPlayer(c, canvas, deltaTime)
}

startGame()