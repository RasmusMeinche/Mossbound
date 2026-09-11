let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

/* const desertMap = new Image()
desertMap.src = "./images/worlds/DesertTileset.png" */

async function loadMap() {
    const response = await fetch("./maps/TinyHeroesMap.tmj")
    const map = await response.json()

    console.log(map)
}

loadMap()

function drawLayer(layer) {
    layer.chunks.forEach(chunk => {
        chunk.data.forEach((gid, index) => {

            if (gid === 0) return

            const localX = index % chunk.width
            const localY = Math.floor(index / chunk.width)

            const tileX = chunk.x + localX
            const tileY = chunk.y + localY

            const pixelX = tileX * 64
            const pixelY = tileY * 64

            console.log(gid, pixelX, pixelY)
        })
    })
}







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

/* const background = new Sprite({
    position: {
    x: -2000,
    y: -2000
    },
    image: desertMap
}) */

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
    },
    shift: {
        pressed: false
    }
}

function animate () {
    window.requestAnimationFrame(animate)
/*     background.draw() */
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

    //Running
    if (keys.shift.pressed && keys.w.pressed && keys.a.pressed) background.position.x = background.position.x + 4, background.position.y = background.position.y + 4
    else if (keys.shift.pressed && keys.w.pressed && keys.d.pressed) background.position.x = background.position.x - 4, background.position.y = background.position.y + 4
    else if (keys.shift.pressed && keys.s.pressed && keys.a.pressed) background.position.x = background.position.x + 4, background.position.y = background.position.y - 4
    else if (keys.shift.pressed && keys.s.pressed && keys.d.pressed) background.position.x = background.position.x - 4, background.position.y = background.position.y - 4
    else if (keys.shift.pressed && keys.w.pressed) background.position.y = background.position.y + 6
    else if (keys.shift.pressed && keys.a.pressed) background.position.x = background.position.x + 6
    else if (keys.shift.pressed && keys.s.pressed) background.position.y = background.position.y - 6
    else if (keys.shift.pressed && keys.d.pressed) background.position.x = background.position.x - 6
    // Walking
    else if (keys.w.pressed && keys.a.pressed) background.position.x = background.position.x + 2, background.position.y = background.position.y + 2
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
    switch (e.code) {
        case "KeyW":
            keys.w.pressed = true
        break
        case "KeyA":
            keys.a.pressed = true
        break
        case "KeyS":
            keys.s.pressed = true
        break
        case "KeyD":
            keys.d.pressed = true
        break
        case "ShiftLeft":
            keys.shift.pressed = true
        break
    }
    console.log(keys)
})

window.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "KeyW":
            keys.w.pressed = false
        break
        case "KeyA":
            keys.a.pressed = false
        break
        case "KeyS":
            keys.s.pressed = false
        break
        case "KeyD":
            keys.d.pressed = false
        break
        case "ShiftLeft":
            keys.shift.pressed = false
        break
    }
})
        