const botaoIniciar = document.getElementById('iniciar')

const cenario = document.getElementById('cenario')
const nave = document.getElementById('nave')

const larguraCenario = cenario.offsetWidth
const alturaCenario = cenario.offsetHeight

const larguraNave = nave.offsetWidth
const alturaNave = nave.offsetHeight

const velocidadeNave = 15

let posicaoHorizontal = 0
let posicaoVertical = 0
let direcaoHorizontal = 0
let direcaoVertical = 0

const teclaPressionada = (tecla) => {
    if (tecla.key === 'ArrowRight') {
        direcaoHorizontal = 1
    } else if (tecla.key === 'ArrowLeft') {
        direcaoHorizontal = -1
    } else if (tecla.key === 'ArrowDown') {
        direcaoVertical = 1
    } else if (tecla.key === 'ArrowUp') {
        direcaoVertical = -1
    }
}

const teclaSolta = (tecla) => {
    if (tecla.key === 'ArrowRight' || tecla.key === 'ArrowLeft') {
        direcaoHorizontal = 0
    } else if (tecla.key === 'ArrowDown' || tecla.key === 'ArrowUp') {
        direcaoVertical = 0
    } 
}

const moveNave = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeNave
    posicaoVertical += posicaoVertical * velocidadeNave

    if (posicaoHorizontal < 0) {
        posicaoHorizontal = 0
    } else if (posicaoVertical + larguraNave > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraNave
    }
    if (posicaoVertical > 0){
        posicaoVertical = 0
    } else if (posicaoVertical + alturaNave > alturaCenario) {
        posicaoVertical = larguraCenario = larguraNave
    }

    nave.style.left = posicaoHorizontal + 'px'
    nave.style.top = posicaoVertical + 'px'

}

const iniciarJogo = () => {
    document.addEventListener('keydown', teclaPressionada)
    document.addEventListener('keyup', teclaSolta)
    checaMoveNave = setInterval(moveNave, 50)
}