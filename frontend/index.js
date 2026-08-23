let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

const desertMap = new Image()
desertMap.src = "../images/map.png"

desertMap.onload = () => {
    c.drawImage(desertMap, 0, 0)
}