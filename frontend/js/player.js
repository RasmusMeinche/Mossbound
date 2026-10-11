const playerWalk = new Image()
playerWalk.src = "./images/player/movement/Walk.png"

const playerIdle = new Image()
playerIdle.src = "./images/player/movement/Idle.png"

const playerRun = new Image()
playerRun.src = "./images/player/movement/Run.png"

export let playerX = 2000
export let playerY = 2000

let playerHitBox = {
    centerX: playerX,
    centerY: playerY + 20,
    radius: 25
}

let testHitBox = {
    centerX: 2200,
    centerY: 2200,
    radius: 40
}
// Udregner forskellen mellem spiller 
let distanceX

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

let animationTimer = 0

export function drawPlayer(c, canvas, deltaTime) {

    let currentSprite

    const isMoving =
        keys.w.pressed ||
        keys.a.pressed ||
        keys.s.pressed ||
        keys.d.pressed

    if (keys.shift.pressed && isMoving) {
        currentSprite = playerRun
    } else if (isMoving) {
        currentSprite = playerWalk
    } else {
        currentSprite = playerIdle
    }

    if (currentSprite === playerWalk || currentSprite === playerRun) {
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

    const testScreenX = canvas.width / 2 + (testHitBox.centerX - playerX)
    const testScreenY = canvas.height / 2 + (testHitBox.centerY - playerY)

    c.beginPath()

    c.arc(
        canvas.width / 2,
        canvas.height / 2 + 20,
        playerHitBox.radius,
        0,
        Math.PI * 2
    )

    c.stroke()

    c.beginPath()

    c.arc(
        testScreenX,
        testScreenY,
        testHitBox.radius,
        0,
        Math.PI * 2
    )

    c.stroke()


    animationTimer = animationTimer + deltaTime

    let frameDuration

    if (currentSprite === playerIdle) {
        frameDuration = 0.13
    } else if (currentSprite === playerWalk) {
        frameDuration = 0.09
    } else if (currentSprite === playerRun) {
        frameDuration = 0.05
    }

    if (animationTimer >= frameDuration) {
        frameX++
        animationTimer = 0
    }

    if (frameX > 14) {
        frameX = 0
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

function checkCollision(nextHitBoxX, nextHitBoxY) {
    let distanceBetweenCenterX = testHitBox.centerX - nextHitBoxX
    let distanceBetweenCenterY = testHitBox.centerY - nextHitBoxY

    const length = Math.sqrt(distanceBetweenCenterX ** 2 + distanceBetweenCenterY ** 2)
    const sumOfRadius = playerHitBox.radius + testHitBox.radius

    if (length <= sumOfRadius) {
        return true
    } else {
        return false
    }
}

export function updatePlayer(deltaTime) {

    let moveX = 0
    let moveY = 0
    let speed = 180

    if (keys.shift.pressed) {
        speed = 360
    }

    if (keys.d.pressed && keys.a.pressed) {

        if (lastHorizontalKey === "a") {
            moveX = -1
        } else if (lastHorizontalKey === "d") {
            moveX = 1
        }

    } else if (keys.d.pressed) {
        moveX = 1
    } else if (keys.a.pressed) {
        moveX = -1
    }

    if (keys.w.pressed && keys.s.pressed) {

        if (lastVerticalKey === "w") {
            moveY = -1
        } else if (lastVerticalKey === "s") {
            moveY = 1
        }

    } else if (keys.w.pressed) {
        moveY = -1
    } else if (keys.s.pressed) {
        moveY = 1
    }


    if (moveX === 1 && moveY === 1) {
        direction = "southeast"
    } else if (moveX === -1 && moveY === -1) {
        direction = "northwest"
    } else if (moveX === 1 && moveY === -1) {
        direction = "northeast"
    } else if (moveX === -1 && moveY === 1) {
        direction = "southwest"
    } else if (moveX === 1) {
        direction = "east"
    } else if (moveX === -1) {
        direction = "west"
    } else if (moveY === 1) {
        direction = "south"
    } else if (moveY === -1) {
        direction = "north"
    }

    // Pythagoras beregner længden af movement-vectoren
    const length = Math.sqrt(moveX ** 2 + moveY ** 2)

    if (length > 0) {
        moveX = moveX / length
        moveY = moveY / length
        
        const nextX = playerX + (moveX * speed * deltaTime)
        const nextY = playerY + (moveY * speed * deltaTime)

        const nextHitBoxX = nextX
        const nextHitBoxY = nextY + 20

        const isCollidingX = checkCollision(nextHitBoxX, playerHitBox.centerY)

        const normalX = playerHitBox.centerX - testHitBox.centerX
        const normalY = playerHitBox.centerY - testHitBox.centerY

        const normalLength = Math.sqrt(normalX ** 2 + normalY ** 2)

        if (normalLength > 0) {
            const normalizedX = normalX / normalLength
            const normalizedY = normalY / normalLength

            const dotProduct = moveX*normalizedX+moveY*normalizedY
        }

        if (dotProduct < 0) {

        }

        if (!isCollidingX) {
            playerX = nextX

            playerHitBox.centerX = nextHitBoxX
        }

        const isCollidingY = checkCollision(playerHitBox.centerX, nextHitBoxY)

        if (!isCollidingY) {
            playerY = nextY

            playerHitBox.centerY = nextHitBoxY
        }

        playerHitBox.centerX = playerX
        playerHitBox.centerY = playerY + 20
    }

    checkCollision()
}

let lastHorizontalKey
let lastVerticalKey

window.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyW":
            keys.w.pressed = true
            lastVerticalKey = "w"
            break
        case "KeyA":
            keys.a.pressed = true
            lastHorizontalKey = "a"
            break
        case "KeyS":
            keys.s.pressed = true
            lastVerticalKey = "s"
            break
        case "KeyD":
            keys.d.pressed = true
            lastHorizontalKey = "d"
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
