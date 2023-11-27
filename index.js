
const Homem = document.querySelector('.head')
const lacuna = document.querySelector('.lacuna')
const input = document.querySelector('input')
const btnTentar = document.querySelector('.tentar')
const letrasTentadas =  document.querySelector('.letraTentada')
const aviso = document.querySelector('.aviso')
const textOverView =  document.querySelector('.textOverView')
const btnReiniciar = document.querySelector('.reiniciar')
const partesHumanas = document.querySelectorAll('.head, .body, .armLeft, .armRight, .legLeft, .legRight, .rola')


let palavras = ['asfalto','assado','cloro','macaco','chicago','topic','cirurgia','viagra', ]

function randomword(){
    const randomIndex = Math.floor(Math.random()* palavras.length)
    return palavras[randomIndex]
}

function desmembrarHomem (){
    let declararDerrota = false
    for(let i = 0; i < partesHumanas.length; i++ ){
        if(partesHumanas[i].classList.contains('invisible')){
            partesHumanas[i].classList.remove('invisible');
            declararDerrota = true
            break
        }
    }
    if(!declararDerrota){
        setTimeout(()=>{
            document.querySelector('main').classList.add('elementoDesfocar')
            
            document.querySelector('.overView').classList.remove('invisible')
            textOverView.innerHTML=(`voce perdeu! a palavra era ${palavraAtual}`)
            btnReiniciar.addEventListener('click',()=>{
                document.querySelector('.overView').classList.add('invisible') 
                location.reload();
            })
            
            
        },250)
    }
}

function esconderLetras(event) {
    return event.replace(/./g, '*');
    
}



let palavraAtual = randomword()
let palavraEscondida = esconderLetras(palavraAtual)

lacuna.innerHTML = palavraEscondida


function verifyClick  (){
    let valorInput = input.value.toLocaleLowerCase()
    mostrarMaiusculo = valorInput.toLocaleUpperCase()
    const apenasLetra = /^[A-Za-z]+$/
    
    
    if(apenasLetra.test(valorInput)){ 
        aviso.textContent= ""
        letrasTentadas.innerHTML+=(`<span>${mostrarMaiusculo},</span>`)
        
    }
    else if(valorInput == "") 
    {aviso.textContent= ('digite algo') 
    return}   
    else{aviso.textContent= ('apenas letras permitidas')
    return}
    
    
    input.value = ""
    
    
    let letraEncontrada = false
    
    for(let j = 0; j < palavraAtual.length; j++){
        letrasDasPalavras = palavraAtual[j]
        if(letrasDasPalavras === valorInput){
            revelarLetra(valorInput)
            console.log(`letra ${mostrarMaiusculo} está presente`)
            letraEncontrada = true
            break
        }        
        
    }
    if (!letraEncontrada) {
        desmembrarHomem()
        console.log(`Letra ${mostrarMaiusculo}  não está presente em nenhuma palavra.`);
    }
}

function revelarLetra(letra) {
    let novaPalavraEscondida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra || (palavraEscondida[i] !== '*' && palavraEscondida[i] !== letra)) {
            novaPalavraEscondida += palavraAtual[i];
        } else {
            novaPalavraEscondida += "*";       
    }
}
palavraEscondida = novaPalavraEscondida;
lacuna.innerHTML = `<span>${palavraEscondida}</span>`;
if(novaPalavraEscondida ===palavraAtual){
    setTimeout(()=>{
        document.querySelector('main').classList.add('elementoDesfocar')
        document.querySelector('.overView').classList.remove('invisible')
        textOverView.innerHTML =('Parabéns! Você ganhou!')
        btnReiniciar.addEventListener('click', ()=>{
            document.querySelector('.overView').classList.add('invisible') 
            location.reload();
        })
        
    },250)
}
}
btnTentar.addEventListener('click',verifyClick)