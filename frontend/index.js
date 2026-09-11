//Finder canvas elementet i HTML
let canvas = document.querySelector("canvas")

//Sætter vinduets højde & bredde til at være lig med browseren højde og bredde
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

/* LOAD MAP */

let map

async function loadMap() {
    const response = await fetch("./maps/TinyHeroesMap.tmj")
    const map = await response.json()

    console.log(map)

    //Finder Grass inde i map arrayet
    function grassLayer (layer) {
        return layer.name === "Grass"
    }

    const layer = map.layers.find(grassLayer)

    console.log(layer)

    //Gå igennem hver værdi i layer.data
    layer.data.forEach((gid, index) => {

        if (gid === 0) {
            return
        }

        const tileX = index % map.width
        const tileY = Math.floor(index / map.width)

        const pixelX = tileX * map.tilewidth
        const pixelY = tileY * map.tileheight

    })

    function findTileset(gid) {
        return firstgid >= 0
    }

    const tileset = map.tileset(findTileset)


}

loadMap() 

