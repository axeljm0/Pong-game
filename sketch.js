let anchoCanvas = 400; // Hacerlo más estrecho
let altoCanvas = 800;  // Hacerlo más alto

let jugadorX;
let jugadorY = 15;
let anchoRaqueta = 100;
let altoRaqueta = 10;

let computadoraX;
let computadoraY = altoCanvas - 25;

let pelotaX, pelotaY;
let diametroPelota = 20;
let velocidadPelotaX = 5;
let velocidadPelotaY = 5;

let grosorMarco = 10;

let jugadorScore = 0;
let computadoraScore = 0;

function setup() {
    createCanvas(anchoCanvas, altoCanvas);
    jugadorX = width / 2 - anchoRaqueta / 2;
    computadoraX = width / 2 - anchoRaqueta / 2;
    resetPelota();
}

function draw() {
    background(0);
    dibujarMarcos();
    dibujarRaquetas();
    dibujarPelota();
    mostrarPuntaje();
    moverPelota();
    moverComputadora();
    verificarColisiones();
}

function dibujarMarcos() {
    fill(255);
    rect(0, 0, grosorMarco, height); // Marco izquierdo
    rect(width - grosorMarco, 0, grosorMarco, height); // Marco derecho
}

function dibujarRaquetas() {
    fill(255);
    rect(jugadorX, jugadorY, anchoRaqueta, altoRaqueta);
    rect(computadoraX, computadoraY, anchoRaqueta, altoRaqueta);
}

function dibujarPelota() {
    fill(255);
    ellipse(pelotaX, pelotaY, diametroPelota, diametroPelota);
}

function mostrarPuntaje() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(jugadorScore, grosorMarco * 3, height / 4);
    text(computadoraScore, grosorMarco * 3, 3 * height / 4);
}

function moverPelota() {
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    // Colisión con el marco izquierdo y derecho
    if (pelotaX - diametroPelota / 2 < grosorMarco || 
        pelotaX + diametroPelota / 2 > width - grosorMarco) {
        velocidadPelotaX *= -1;
    }
}

function moverComputadora() {
    if (pelotaX > computadoraX + anchoRaqueta / 2) {
        computadoraX += 4;
    } else if (pelotaX < computadoraX + anchoRaqueta / 2) {
        computadoraX -= 4;
    }
    computadoraX = constrain(computadoraX, grosorMarco, width - grosorMarco - anchoRaqueta);
}

function verificarColisiones() {
    // Colisión con la raqueta del jugador
    if (pelotaY - diametroPelota / 2 < jugadorY + altoRaqueta && 
        pelotaX > jugadorX && pelotaX < jugadorX + anchoRaqueta) {
        velocidadPelotaY *= -1;
    }

    // Colisión con la raqueta de la computadora
    if (pelotaY + diametroPelota / 2 > computadoraY && 
        pelotaX > computadoraX && pelotaX < computadoraX + anchoRaqueta) {
        velocidadPelotaY *= -1;
    }

    // Colisión con los bordes superior e inferior (anotación y reinicio)
    if (pelotaY < 0) {
        computadoraScore++;
        resetPelota();
    } else if (pelotaY > height) {
        jugadorScore++;
        resetPelota();
    }
}

function resetPelota() {
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX = 5 * (Math.random() > 0.5 ? 1 : -1);
    velocidadPelotaY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        jugadorX -= 50;
    } else if (keyCode === RIGHT_ARROW) {
        jugadorX += 50;
    }
    jugadorX = constrain(jugadorX, grosorMarco, width - grosorMarco - anchoRaqueta);
}
