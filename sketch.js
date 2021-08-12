//variáveis da bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variáveis do movimento da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variáveis da raquete 
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variáveis da raquete do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYraqueteOponente;

//variável de colisão
let colidiu = false;
let chanceDeErrar = 0;

//variáveis do placar 
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis som do jogo
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound ("Trilha.mp3");
  raquetada = loadSound ("raquetada.mp3");
  ponto = loadSound ("ponto.mp3");
}
 

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(color (152,251,152));
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  mostraRede();
}

function mostraRede (){
  fill (color(128, 128, 128));
  rect (300, 65, 5, 300)
}

function mostraBolinha (){
  fill(color(128, 128, 128))
  circle (xBolinha, yBolinha, diametro);  
}

function movimentaBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificaColisaoBolinha(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXbolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYbolinha *= -1;
  }
}

function mostraRaquete (x, y){
  fill(color(28, 28, 28))
  rect (x , y, larguraRaquete, alturaRaquete);
}

function movimentaRaquete (){
  if(keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown (DOWN_ARROW)){
    yRaquete += 10;
  }
}
  
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete &&
       yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }  
}

function verificaColisaoRaquete(x, y){
  colidiu = 
    collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYraqueteOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYraqueteOponente + chanceDeErrar;
  
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39){
      chanceDeErrar = 50
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
   } 

}

function mostraPlacar(){
  textSize (16);
  textAlign (CENTER);
  fill(color (0, 0, 0));
  rect(150, 10, 30, 20);
  fill(255);
  text (meusPontos, 165, 26);
  fill(color(0, 0, 0));
  rect(430, 10, 30, 20);
  fill(255);
  text (pontosDoOponente, 445, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

console.log ("Trilha : Donkey Kong Country 2 - Bayou Boogie (Lo-Fi Hip Hop Remix)")