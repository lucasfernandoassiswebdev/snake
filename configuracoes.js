var tempo;//variável que controla o tempo que a snake demora pra andar
var blocosl = [];//2 arrays que simulam um X e Y num plano cartesiano para representar as posições da snake
var blocoscol = [];
var linhacomida;//2 variáveis que simulam um X e Y num plano cartesiano também, porém estas são usadas para a comida
var colunacomida;
var direcaoatual;
var interval;
var arraydirecoes = []

function inicia() {
	document.querySelector("#tabela").innerHTML = new Array(14).join("<tr>" + new Array(21).join("<td></td>") + "</tr>");//criando a tabela no html com 13 linhas e 20 colunas
		$('#botao').click( function() {//mudando o estado do jogo e iniciando funções
			if ($('#botao').html() == "Start") {
				startgame();
			} else if ($('#botao').html() == "Pause") {
				pausegame();
			} else if ($('#botao').html() == "Voltar") {
				despause();
			} else {
				$('#botao').html('Restart');
				$('#status').html('Morto'); 
				startgame();
			}
		});
};
			
function startgame() {
	blocoscol = [];//apagando a snake pra não bugar quando der restart
	blocosl = []
	tempo = 300;//tempo de 300 milisegundos pra andar
	//gerando um array com todas as casas coloridas da table
	var array = document.querySelectorAll('.snakeCorpo, .snakeRabo, .snakeCabeca, .snakeComida');
	//apagando essas casas
	for (var i = 0; i < array.length; i++) {
			array[i].className = '';
	}	
	
	blocosl[0] = 1;//definindo posição da cabeça
    blocoscol[0] = 3;
	arraydirecoes.push('D');//direção inicial
	blocosl.push(blocosl[0]);//blocos atrás da cabeça
	blocoscol.push(blocoscol[0] - 1);
	blocosl.push(blocosl[0]);
	blocoscol.push(blocoscol[0] - 2);	
	
	nascecomida();//fazendo aparecer o primeiro boloco de comida
	
	document.getElementById("botao").innerHTML = "Pause";
	document.getElementById("status").innerHTML = "Status: jogando";
	
	document.querySelector('#tabela tr:nth-child(1) td:nth-child(1)').className = "snakeRabo";//pintando a snake
	document.querySelector('#tabela tr:nth-child(1) td:nth-child(2)').className = "snakeCorpo";
	document.querySelector('#tabela tr:nth-child(1) td:nth-child(3)').className = "snakeCabeca";
	
	interval = setInterval(anda, tempo);//começando o jogo
};
			
function pausegame() {//função que pausa o jogo
	document.getElementById("botao").innerHTML = "Voltar";
	document.getElementById("status").innerHTML = "Status: pausado";
	clearInterval(interval);
}
			
function despause() {//despausando
	document.getElementById("botao").innerHTML = "Pause";
	document.getElementById("status").innerHTML = "Status: jogando";
	clearInterval(interval);
	interval = setInterval(anda, tempo);
}

function verificacomida(x,y) {//não deixa a comida nascer encima da snake
		for (var i = 0; i < blocoscol.length; i++) {
			if (blocosl[i] == x && blocoscol[i] == y) {
				linhacomida = Math.floor((Math.random() * 13) + 1);
				colunacomida = Math.floor((Math.random() * 20) + 1);
			}
		}
		document.querySelector('#tabela tr:nth-child(' + linhacomida + ') td:nth-child(' + colunacomida + ')').className = 'snakeComida';
};
		
function nascecomida() {//faz a comida nascer
    linhacomida = Math.floor((Math.random() * 13) + 1);
    colunacomida = Math.floor((Math.random() * 20) + 1);
    verificacomida(linhacomida,colunacomida);
};
			
function morre() {
	clearInterval(interval);
	document.getElementById('botao').innerHTML = "Restart";
	document.getElementById('status').innerHTML = "Morto";
	document.querySelector('#tabela tr:nth-child(' + linhacomida + ') td:nth-child(' + colunacomida + ')').className = '';
};
			
function come() {//come um bloco, faz outro nascer e reduz o tempo que a snake demora pra andar
	blocosl.push(blocosl[blocosl.length - 1]);
	blocoscol.push(blocoscol[blocoscol.length - 1]);
	
	document.getElementById("pontos").innerHTML = "Pontos: " + (blocoscol.length - 3);
	nascecomida();
	
	if (tempo > 100) {
		tempo -= 25;
		clearInterval(interval);
		interval = setInterval(anda, tempo);
	}
}

function anda() {//função que faz a snake se movimentar
	var lrabo = blocosl[blocosl.length - 1];
	var crabo = blocoscol[blocoscol.length - 1];
	
	document.querySelector('#tabela tr:nth-child(' + lrabo + ') td:nth-child(' + crabo + ')').className = '';//apagando o bloco do rabo
	
	for (var i = blocosl.length - 1; i >= 1; i-- ) {//pego o ultimo bloco e coloco na posição do da frente e assim por diante
		blocosl[i] = blocosl[i - 1];
		blocoscol[i] = blocoscol[i - 1];
		var className = i == blocosl.length - 1 ? "snakeRabo" : "snakeCorpo";
		document.querySelector('#tabela tr:nth-child(' + blocosl[i] + ') td:nth-child(' + blocoscol[i] + ')').className = className;
	}
	
	direcaoatual = arraydirecoes[arraydirecoes.length - 1];//indo pra ultima direção setada
	
	if (direcaoatual == 'D') {//definindo a nova casa da cabeça
		if (blocoscol[0] >= 20) {
			blocoscol[0] = 1;
		} else {
			blocoscol[0] += 1;
		}
	} else if(direcaoatual == 'E') {
		if (blocoscol[0] <= 1) {
			blocoscol[0] = 20;
		} else {
			blocoscol[0] -= 1;
		}
	} else if (direcaoatual == 'C') {
		if (blocosl[0] <= 1) {
			blocosl[0] = 13;
		} else {
			blocosl[0] -= 1;
		}
	} else if (direcaoatual == 'B') {
		if (blocosl[0] >= 13) {
			blocosl[0] = 1;
		} else {
			blocosl[0] += 1;
		}
	}
	
	if (arraydirecoes.length > 1){//arrancando as casas do array de direções após andar
		arraydirecoes[arraydirecoes.length - 2] = arraydirecoes[arraydirecoes.length - 1]
		arraydirecoes.splice(arraydirecoes.length - 1, 1);
	}
	
	document.querySelector('#tabela tr:nth-child(' + blocosl[0] + ') td:nth-child(' + blocoscol[0] + ')').className = 'snakeCabeca';//colorindo a cabeça na nova posição
	
	if (blocosl[0] == linhacomida && blocoscol[0] == colunacomida)//se a cabeça estiver encima da comida executa a função come
		come();
	
	for (i = 1; i < blocoscol.length; i++) {//se a cabeça bater no corpo a snake morre
		if (blocosl[0] == blocosl[i] && blocoscol[0] == blocoscol[i]) 
			morre();
	}
}

window.onkeydown = function(e) {//mudando a direção da snake
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 39) {
		if (direcaoatual !== 'E') {
			arraydirecoes.push('D');
		}
	} else if (key == 37) {
		if (direcaoatual !== 'D') {
			arraydirecoes.push('E');
		}
	} else if (key == 38) {
		if (direcaoatual !== 'B') {
			arraydirecoes.push('C');
		}
	} else if (key == 40) {
		if (direcaoatual !== 'C') {
			arraydirecoes.push('B');
		}
	}
}
