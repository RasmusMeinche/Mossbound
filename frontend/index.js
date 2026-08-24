let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

const desertMap = new Image()
desertMap.src = "./images/worlds/DesertTileset.png"

const playerDown = new Image()
playerDown.src = "./images/playerMovement/PlayerSpriteDown.png"

class Sprite {
    constructor({
        position,
        image
    }) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

const background = new Sprite({
    position: {
    x: -2000,
    y: -2000
    },
    image: desertMap
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate () {
    window.requestAnimationFrame(animate)
    background.draw()
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

    if (keys.w.pressed && keys.a.pressed) background.position.x = background.position.x + 2, background.position.y = background.position.y + 2
    else if (keys.w.pressed && keys.d.pressed) background.position.x = background.position.x - 2, background.position.y = background.position.y + 2
    else if (keys.s.pressed && keys.a.pressed) background.position.x = background.position.x + 2, background.position.y = background.position.y - 2
    else if (keys.s.pressed && keys.d.pressed) background.position.x = background.position.x - 2, background.position.y = background.position.y - 2
    else if (keys.w.pressed) background.position.y = background.position.y + 3
    else if (keys.a.pressed) background.position.x = background.position.x + 3
    else if (keys.s.pressed) background.position.y = background.position.y - 3
    else if (keys.d.pressed) background.position.x = background.position.x - 3
}
animate()

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true
        break
        case "a":
            keys.a.pressed = true
        break
        case "s":
            keys.s.pressed = true
        break
        case "d":
            keys.d.pressed = true
        break
    }
    console.log(keys)
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false
        break
        case "a":
            keys.a.pressed = false
        break
        case "s":
            keys.s.pressed = false
        break
        case "d":
            keys.d.pressed = false
        break
    }
})
        