const playerWalk = new Image()
playerWalk.src = "./images/player/movement/Walk.png"

const playerIdle = new Image()
playerIdle.src = "./images/player/movement/Idle.png"

export let playerX = 2000
export let playerY = 2000
let frameX = 0
let frameY = 3

let direction
const walkDirection = {
    east: 0,
    southeast: 1,
    south: 2,
    southwest: 3,
    west: 4,
    northwest: 5,
    north: 6,
    northeast: 7
}

let drawPlayerCounter = 0

export function drawPlayer(c, canvas) {
    const sourceX = 128 * frameX
    const sourceY = 128 * frameY

    let currentSprite

    if (keys.w.pressed && keys.d.pressed) {
        currentSprite = playerWalk
        direction = "northeast"
    } else if (keys.w.pressed && keys.a.pressed) {
        currentSprite = playerWalk
        direction = "northwest"
    } else if (keys.s.pressed && keys.a.pressed) {
        currentSprite = playerWalk
        direction = "southwest"
    } else if (keys.s.pressed && keys.d.pressed) {
        currentSprite = playerWalk
        direction = "southeast"
    } else if (keys.w.pressed) {
        currentSprite = playerWalk
        direction = "north"
    } else if (keys.a.pressed) {
        currentSprite = playerWalk
        direction = "west"
    } else if (keys.s.pressed) {
        currentSprite = playerWalk
        direction = "south"
    } else if (keys.d.pressed) {
        currentSprite = playerWalk
        direction = "east"
    } else {
        currentSprite = playerIdle
    }

    if (currentSprite === playerWalk) {
        frameY = walkDirection[direction]
    }

    c.drawImage(
        currentSprite,

        sourceX,      // sourceX: s tart ved x = 0 i spritesheetet
        sourceY,      // sourceY: start ved y = 0 i spritesheetet
        128,    // sourceWidth: klip 128px i bredden
        128,    // sourceHeight: klip 128px i højden

        canvas.width / 2 - 64,   // centrer spillerens 128px bredde
        canvas.height / 2 - 64,  // centrer spillerens 128px højde
        128,    // tegn framen 128px bred
        128     // tegn framen 128px høj
    )

    drawPlayerCounter++

    if (frameX === 14) {
        frameX = 0
    }

    if (drawPlayerCounter === 6) {
        frameX++
        drawPlayerCounter = 0
    }
}

 
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

export function updatePlayer() {

    let moveX = 0
    let moveY = 0
    let speed = 3

    if (keys.d.pressed) {
        moveX = 1
    } else if (keys.a.pressed) {
        moveX = -1
    }
    playerX = playerX + (moveX * speed)

    if (keys.w.pressed) {
        moveY = -1
    } else if (keys.s.pressed) {
        moveY = 1
    }
    playerY = playerY + (moveY * speed)

    if (keys.shift.pressed && keys.w.pressed && keys.a.pressed) playerX = playerX - 4, playerY = playerY - 4
    else if (keys.shift.pressed && keys.w.pressed && keys.d.pressed) playerX = playerX + 4, playerY = playerY - 4
    else if (keys.shift.pressed && keys.s.pressed && keys.a.pressed) playerX = playerX - 4, playerY = playerY + 4
    else if (keys.shift.pressed && keys.s.pressed && keys.d.pressed) playerX = playerX + 4, playerY = playerY + 4
    else if (keys.shift.pressed && keys.w.pressed) playerY = playerY - 6
    else if (keys.shift.pressed && keys.a.pressed) playerX = playerX - 6
    else if (keys.shift.pressed && keys.s.pressed) playerY = playerY + 6
    else if (keys.shift.pressed && keys.d.pressed) playerX = playerX + 6
    // Walking
    else if (keys.w.pressed && keys.a.pressed) playerX = playerX - 2, playerY = playerY - 2
    else if (keys.w.pressed && keys.d.pressed) playerX = playerX + 2, playerY = playerY - 2
    else if (keys.s.pressed && keys.a.pressed) playerX = playerX - 2, playerY = playerY + 2
    else if (keys.s.pressed && keys.d.pressed) playerX = playerX + 2, playerY = playerY + 2
    else if (keys.w.pressed) playerY = playerY - 3
    else if (keys.a.pressed) playerX = playerX - 3
    else if (keys.s.pressed) playerY = playerY + 3
    else if (keys.d.pressed) playerX = playerX + 3
}

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
        