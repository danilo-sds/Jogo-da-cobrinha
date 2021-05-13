let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

//Localização da comida
//floor deixa flutuante e random coloca um número aleatório

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Criação da Caixa

function criarBG() {
    context.fillStyle = "#808080";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Criação da Cobra

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawfood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Pega o evento de click do teclado e chama a update

document.addEventListener('keydown', update);

//Aperta uma tecla, vai chamar a update e chamar o evento de tecla

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

//Faz a cobra ultrapassar as paredes

function inicarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //Fim de jogo

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('GAME OVER! Tente outra vez!  ');
        }
    }

    criarBG();
    criarCobrinha();
    drawfood(); //Função que cria a comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Movimentação da cobra

    /*if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;*/

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //Retira o último elemento da cobra

    if (snakeX != food.x || snakeY != food.y) {

        //Retira o último elemento do array

        snake.pop();

    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
            food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    //Criação da nova cabeça, adiciona um elemento na frente no array

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
//Para atualizar o jogo a cada milisegundos, assim ele não trava
let jogo = setInterval(inicarJogo, 100);