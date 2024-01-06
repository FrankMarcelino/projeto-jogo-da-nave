const botaoIniciar = document.getElementById('iniciar')

const cenario = document.getElementById('cenario')
const nave = document.getElementById('nave')

const larguraCenario = cenario.offsetWidth
const alturaCenario = cenario.offsetHeight

const larguraNave = nave.offsetWidth
const alturaCeNave = nave.offsetHeight

const velocidadeNave = 15

let posicaoHorizontal = larguraCenario / 2 -50
let posicaoVertical =  alturaCenario - alturaCeNave
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
    posicaoVertical += direcaoVertical * velocidadeNave

    if (posicaoHorizontal < 0) {
        posicaoHorizontal = 0
    } else if (posicaoHorizontal + larguraNave > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraNave
    }
    if (posicaoVertical < 0) {
        posicaoVertical = 0
    } else if (posicaoVertical + alturaCeNave > alturaCenario) {
        posicaoVertical = alturaCenario - alturaCeNave
    }

    nave.style.left = posicaoHorizontal + 'px'
    nave.style.top = posicaoVertical + 'px'

} 

const criaTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement('div')
    tiro.className= 'tiro'
    tiro.style.position = 'absolute'
    tiro.style.width = '10px'
    tiro.style.height = '10px'
    tiro.style.backgroundColor = 'red'
    tiro.style.left = posicaoLeftTiro + 'px'
    tiro.style.top = posicaoTopTiro = 'px'
    cenario.appendChild(tiro)

}

const iniciarJogo = () => {
    document.addEventListener('keydown', teclaPressionada)
    document.addEventListener('keyup', teclaSolta)
    checaMoveNave = setInterval(moveNave, 50)
    botaoIniciar.style.display = 'none'
}