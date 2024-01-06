const botaoIniciar = document.getElementById('iniciar')

const cenario = document.getElementById('cenario')
const nave = document.getElementById('nave')
const vida = document.getElementById('vida')

const larguraCenario = cenario.offsetWidth
const alturaCenario = cenario.offsetHeight

const larguraNave = nave.offsetWidth
const alturaCeNave = nave.offsetHeight

const velocidadeNave = 15
const velocidadeTiro = 20
const velocidadeNaveInimiga = 5

let checaMoveNave
let checaMoveNaveInimiga
let chacaMoveTiro
let checaTiros
let checaNaveInimiga
let checaColisao

let estaAtirando = false

let vidaAtual = 100

let posicaoHorizontal = larguraCenario / 2 - 50
let posicaoVertical = alturaCenario - alturaCeNave
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

const atirar = () => {
    if (estaAtirando) {
        criaTiros(posicaoHorizontal + 45, posicaoVertical - 10)
    }
}

document.addEventListener('keydown', (tecla) => {
    if (tecla.key === ' ') {
        estaAtirando = true

    }

})

document.addEventListener('keyup', (tecla) => {
    if (tecla.key === ' ') {
        estaAtirando = false
    }
})


const criaTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement('div')
    tiro.className = 'tiro'
    tiro.style.position = 'absolute'
    tiro.style.width = '10px'
    tiro.style.height = '10px'
    tiro.style.left = posicaoLeftTiro + 'px'
    tiro.style.top = posicaoTopTiro + 'px'
    tiro.style.backgroundColor = 'red'
    cenario.appendChild(tiro)
}

const moveTiros = () => {
    const tiros = document.querySelectorAll('.tiro')
    tiros.forEach ((element,index) =>{
        if (element){
            let posicaoTopTiro = tiros[index].offsetTop
            posicaoTopTiro -= velocidadeTiro
            tiros[index].style.top = posicaoTopTiro + 'px'
            if (posicaoTopTiro < -10) {
                tiros[index].remove()
            }
        }
    })
}

const naveInimigas =  () => {
    const naveInimiga = document.createElement('div')
    naveInimiga.className = 'naveInimiga'
    naveInimiga.style.position = 'absolute'
    naveInimiga.setAttribute('data-vida', 5)
    naveInimiga.style.width = '100px'
    naveInimiga.style.height = '100px'
    naveInimiga.style.backgroundImage = 'url(../imagens/inimigo.gif)'
    naveInimiga.style.backgroundPosition = 'center'
    naveInimiga.style.backgroundRepeat = 'no-repeat'
    naveInimiga.style.backgroundSize = 'contain'
    naveInimiga.style.left  = Math.floor(Math.random() * (larguraCenario - larguraNave)) + 'px'
    naveInimiga.style.top + '-100px'
    cenario.appendChild(naveInimiga)
}

const moveNaveInimigas = () => {
    const inimigo = document.querySelectorAll('.naveInimiga')
    inimigo.forEach((element, index) => {
        if(element){
            let posicaoTopNaveInimiga = inimigo[index].offsetTop
            posicaoTopNaveInimiga += velocidadeNaveInimiga
            inimigo[index].style.top = posicaoTopNaveInimiga + 'px'
        
            console.log(posicaoTopNaveInimiga[index])
            if (posicaoTopNaveInimiga > alturaCenario){
                vidaAtual -= 5
                if (vidaAtual === 0) {
                    gameOver()
                }
                vida.textContent = `Vida: ${vidaAtual}`
                inimigo[index].remove()
            } 
        }
    })
}

const colisao = () => {
    const todasNaveInimigas = document.querySelectorAll('.naveInimiga')
    const todosTiros = document.querySelectorAll('.tiro')
    todasNaveInimigas.forEach((naveInimiga) => {
        todosTiros.forEach((tiro) => {
            const colisaoNaveInimiga = naveInimiga.getBoundingClientRect()
            const colisaoTiro = tiro.getBoundingClientRect()

            let vidaAtualNaveInimiga = parseInt(naveInimiga.getAttribute('data-vida'), 10)
           
            if (
                colisaoNaveInimiga.left < colisaoTiro.right &&
                colisaoNaveInimiga.right > colisaoTiro.left &&
                colisaoNaveInimiga.top < colisaoTiro.bottom &&
                colisaoNaveInimiga.bottom > colisaoTiro.top
            ) {
                vidaAtualNaveInimiga--
                console.log(vidaAtualNaveInimiga)
                tiro.remove()
                if (vidaAtualNaveInimiga === 0) {
                    naveInimiga.remove()
                }else{
                    naveInimiga.setAttribute('data-vida', vidaAtualNaveInimiga)
                }
            }
        })
    })
}

const gameOver = () => {
    document.removeEventListener('keydown', teclaPressionada)
    document.removeEventListener('keyup', teclaSolta)
    clearInterval(checaMoveNave)
    clearInterval(checaMoveNaveInimiga)
    clearInterval(checaNaveInimiga)
    clearInterval(checaTiros)
    clearInterval(checaColisao)

    const perdeu =document.createElement('div')
    perdeu.style.position = 'absolute'
    perdeu.innerHTML = 'Você Perdeu!'
    perdeu.style.backgroundColor = 'white'
    perdeu.style.color  = 'red'
    perdeu.style.left = '50%'
    perdeu.style.top = '50%' 
    perdeu.style.padding = '10px 20px'
    perdeu.style.borderRadius = '5px'
    perdeu.style.transform = 'translate(-50%, 50%)'
    cenario.appendChild(perdeu)
    cenario.removeChild(nave)
    
    const naveInimigas = document.querySelectorAll('.naveInimiga')
    naveInimigas.forEach((inimigos) => {
        inimigos.remove()
    })

    const tiros = document.querySelectorAll('.tiro') 
    tiros.forEach((tiro) => {
        tiro.remove()
    })
}

const iniciarJogo = () => {
    document.addEventListener('keydown', teclaPressionada)
    document.addEventListener('keyup', teclaSolta)
    checaMoveNave = setInterval(moveNave, 50)
    checaMoveNaveInimiga = setInterval(moveNaveInimigas, 50)
    chacaMoveTiro = setInterval(moveTiros, 50)
    checaNaveInimiga = setInterval(naveInimigas, 2500)
    
    checaTiros = setInterval(atirar, 10) 
    checaColisao = setInterval(colisao, 10)
    botaoIniciar.style.display = 'none'
}