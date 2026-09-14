import { playerX, playerY } from "./player.js"

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

    async function loadTileset(tileset) {

            //Hent tileset Source
            const tilesetSource = await fetch("./tileset/" + tileset.source)
            const response = await tilesetSource.text()

            //Konverterer raw input data til et format javaScript kan læse
            const parser = new DOMParser()
            const xml = parser.parseFromString(response, "text/xml")

            const tilesetElement = xml.querySelector("tileset")
            const columns = tilesetElement.getAttribute("columns")
            const columnNumber = Number(columns)

            const tileWidth = Number(tilesetElement.getAttribute("tilewidth"))
            const tileHeight = Number(tilesetElement.getAttribute("tileheight"))

            const imageElement = xml.querySelector("image")
            const imageSource = imageElement.getAttribute("source")

            const resolvedImageSource = new URL(imageSource, tilesetSource.url).href

        return {columnNumber, tileWidth, tileHeight, resolvedImageSource}
    }

    const tilesets = map.tilesets

    function findTileset(gid) {

        let bestCandidate

        tilesets.forEach((tileset)=> {

            if (gid >= tileset.firstgid) {
                bestCandidate = tileset
            }
        })
        return bestCandidate
    }

    const loadedTilesets = []

    for (const tileset of tilesets) {
        const loadedData = await loadTileset(tileset)

        const image = new Image ()
        image.src = loadedData.resolvedImageSource
        await image.decode()


        loadedTilesets.push(
            {tilesetFirstgid: tileset.firstgid,
            columnNumber: loadedData.columnNumber,
            tileWidth: loadedData.tileWidth,
            tileHeight: loadedData.tileHeight,
            image: image
            }
        )
    }

    function renderMap() {

    for (const layer of map.layers) {
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

        const screenX = pixelX - cameraX
        const screenY = pixelY - cameraY

        //Hvilke tiles som skal tegnes
        const tileset = findTileset(gid)

        const localId = gid - tileset.firstgid

        const loadedTileset = loadedTilesets.find((item) => {
        return item.tilesetFirstgid === tileset.firstgid
        })

        const sourceTileX = localId % loadedTileset.columnNumber
        const sourceTileY = Math.floor(localId / loadedTileset.columnNumber)

        const sourcePixelX = sourceTileX * loadedTileset.tileWidth
        const sourcePixelY = sourceTileY * loadedTileset.tileHeight

        c.drawImage(
            loadedTileset.image,
            sourcePixelX,
            sourcePixelY,
            loadedTileset.tileWidth,
            loadedTileset.tileHeight,
            screenX,
            screenY,
            loadedTileset.tileWidth,
            loadedTileset.tileHeight
        )
    })

    }
    }

    function renderMap() {
        let cameraX = playerX - canvas.width / 2
        let cameraY = playerY - canvas.height / 2
    }

}

loadMap() 

