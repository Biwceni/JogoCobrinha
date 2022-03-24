let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // Tratar o arquivo como um plano 2D
let box = 32; // Definição do tamanho do local do jogo

// Definição do tamanho da Cobrinha por meio de coordenadas
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // Definindo a direção que a Cobrinha vai percorrer
// Definindo o posicionamento da comida, para ela poder aparecer em posições aleatórias na box
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Desenhar e definir cores
function criarBG() {
    context.fillStyle = "lightgreen"; // Definindo uma cor
    context.fillRect(0, 0, 16 * box, 16 * box); // Desenhando onde vai acontecer o jogo
}

// Definir a Cobrinha
function criarCobrinha(){
    for(i=0; i < snake.length; i++){ // Passar pelas coordenadas da Cobrinha
        context.fillStyle = "green"; // Dar uma cor
        context.fillRect(snake[i].x, snake[i].y, box, box); // Definir o seu desenho e posição
    }
}

// Definir a comida da Cobrinha
function drawFoood(){
    context.fillStyle = "red"; // Definindo a cor da comida
    context.fillRect(food.x, food.y, box, box); // Definindo o seu posicionamento inicial
}

// Captar o nosso toque do botão(keydown) e transmita o toque da tela para a função
document.addEventListener('keydown', update);

// A direção não pode ser a oposta a tecla pressionada
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Função para definir o início do jogo
function iniciarJogo(){
    // Plano cartesiano com o ponto x e y, usado como base para manter a Cobrinha dentro do box
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    // Checar se cada coordenada se choca com o corpo da Cobrinha
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            // Para finalizar o jogo
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG(); // Chamando a função
    criarCobrinha(); // Chamando a função
    drawFoood(); // Chamando a função

    // Indicando a posição de início da Cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y
    
    // Trabalhando na movimentação da Cobrinha com base nas direções que ela tomar
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Comparação de posições da Cobrinha, para quando atingir a comida incrementar o seu tamanho e realizar a mudança de posicionamento da comida, depois de ser atingida pela Cobrinha
    if(snakeX != food.x || snakeY != food.y){
        // Para retirar o último elemento do array
        snake.pop();
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box, 
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    // Para criar a nova cabeça da Cobrinha depois dela ter andado
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Acrescentar a frente
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); // Intervalo em milissegundos para a cada 100 milisegundos ele iniciar o jogo