let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

const desertMap = new Image()
desertMap.src = "./images/worlds/DesertTileset.png"

const playerDown = new Image()
playerDown.src = "./images/playerMovement/PlayerSpriteDown(1).png"

desertMap.onload = () => {
    c.drawImage(desertMap, 0, 0)
    c.drawImage(
        playerDown,
        0,
        0,
        playerDown.width / 6 + 2,
        playerDown.height,
        canvas.width / 2 - (playerDown.width / 6) / 2,
        canvas.height / 2 - playerDown.height / 2,
        playerDown.width / 6,
        playerDown.height
    )

    window.addEventListener("keydown", () => {
        console.log("Du har trykket")
    })
        
}