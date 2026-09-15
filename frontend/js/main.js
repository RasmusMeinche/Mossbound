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

    gameLoop()
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop)

    updatePlayer()
    renderMap(c, canvas)
    drawPlayer(c, canvas)
}

startGame()