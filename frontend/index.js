//Finder canvas elementet i HTML
let canvas = document.querySelector("canvas")

//Sætter vinduets højde & bredde til at være lig med browseren højde og bredde
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

/* LOAD MAP */

async function loadMap() {
    const response = await fetch("./maps/TinyHeroesMap.tmj")
    const map = await response.json()

    console.log(map)

    //Finder Grass inde i map arrayet
    function grassLayer (layer) {
        return layer.name === "Grass"
    }

    const layer = map.layers.find(grassLayer)
    const tilesets = map.tilesets

    console.log(layer)

    function findTileset(gid) {

    let bestCandidate

    tilesets.forEach((tileset)=> {

        if (gid >= tileset.firstgid) {
            bestCandidate = tileset
        }
    })
        console.log(bestCandidate)
        return bestCandidate
    }

    //Gå igennem hver værdi i layer.data
    layer.data.forEach((gid, index) => {

        if (gid === 0) {
            return
        }

        const tileX = index % map.width
        const tileY = Math.floor(index / map.width)

        //Hvor tilen skal tegnes
        const pixelX = tileX * map.tilewidth
        const pixelY = tileY * map.tileheight

        //Hvilke tiles som skal tegnes
        const tileset = findTileset(gid)
        console.log(tileset)

        const localId = gid - tileset.firstgid
        console.log(localId)
    })

}

loadMap() 

