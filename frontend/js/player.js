const playerWalk = new Image()
playerWalk.src = "./images/player/movement/Walk.png"

const playerIdle = new Image()
playerIdle.src = "./images/player/movement/Idle.png"

const playerRun = new Image()
playerRun.src = "./images/player/movement/Run.png"

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

    const sourceX = 128 * frameX
    const sourceY = 128 * frameY

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

export function updatePlayer(deltaTime) {

    let moveX = 0
    let moveY = 0
    let speed = 180

    if (keys.shift.pressed) {
        speed = 360
    }

    if (keys.d.pressed) {
        moveX = 1
    } else if (keys.a.pressed) {
        moveX = -1
    }

    if (keys.w.pressed) {
        moveY = -1
    } else if (keys.s.pressed) {
        moveY = 1
    }

    // Pythagoras beregner længden af movement-vectoren
    const length = Math.sqrt(moveX**2 + moveY**2)

    if (length > 0) {
        moveX = moveX / length
        moveY = moveY / length
        playerX = playerX + (moveX * speed * deltaTime)
        playerY = playerY + (moveY * speed * deltaTime)
    }
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
        