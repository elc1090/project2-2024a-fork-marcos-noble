var acertos = 0;
var erros = 0;
var selecionado = true;

function startQuiz() {
    document.getElementById("startScreen").style.display = "none"; // Hide start screen
    document.getElementById("telaJogo").style.display = "block"; // Show quiz screen
    gerarPergunta(); // Generate the first question
}

// Function to go back to the start screen
function goToStartScreen() {
    document.getElementById("telaJogo").style.display = "none"; // Hide quiz screen
    document.getElementById("startScreen").style.display = "block"; // Show start screen
}

function gerarPergunta() {
    var baseUrl = "https://quizapi.io/api/v1/questions";
    var apiKey = "SEzVACg9eCGTTmfHeqOj0x3xG6XlmyOb04DTgitf"; // Replace with your actual API key
    var limit = 1;
    var difficulty = document.getElementById("difficulty").value == "todas"? "": document.getElementById("difficulty").value;
    var category = document.getElementById("category").value == "todas"? "": document.getElementById("category").value;
    
    var url = new URL(baseUrl);
    url.searchParams.append("apiKey", apiKey);
    url.searchParams.append("limit", limit);
    url.searchParams.append("category", category);
    url.searchParams.append("difficulty", difficulty);
    console.log(url);
    if(selecionado){        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const pergunta = data[0].question;
            const respostas = Object.values(data[0].answers);
            const respostasBool = Object.values(data[0].correct_answers);
            const multipla = data[0].multiple_correct_answers;
            const tema = data[0].category;
            const difficulty = data[0].difficulty;
            console.log(multipla);
            
            if(multipla == "false") {
                selecionado = false;
                console.log(multipla) //saber se é de multipla escolha
                console.log("Correct Answers:", respostasBool);
                

                document.getElementById("tema").textContent = `Categoria: ${tema}`;
                document.getElementById("dificuldade").textContent = `Dificuldade: ${difficulty}`;
                //Mostra a pergunta no elemento 
                document.getElementById("caixaPergunta").textContent = pergunta;

                //Limpa as opções 
                const listaRespostas = document.getElementById("listaRespostas");        
                while (listaRespostas.firstChild) {
                    listaRespostas.removeChild(listaRespostas.firstChild);
                }

                // Criar os elementos com listeners 
                respostas.forEach((answer, index) => {
                    console.log("Index:", index);
                    console.log("Correctness:", respostasBool[index]);
                    

                    if(answer != null){
                        const respostaLi = document.createElement("li");
                        respostaLi.textContent = answer;
                        let booler = respostasBool[index];
                        respostaLi.classList.add(respostasBool[index]);               
                        respostaLi.addEventListener('click', () => {     
                            if(listaRespostas.querySelector('.selected')){
                                const activeOption = listaRespostas.querySelector('.selected');
                                activeOption.classList.remove('selected');
                            }
                            respostaLi.classList.add('selected');
                            //selecionado = true;
                        });                    
                        listaRespostas.appendChild(respostaLi);
                    }
                });      
            }else(gerarPergunta());              
        })
        .catch(err => console.error(err));
    }
    
}

function verificarResposta(){
    const listaRespostas = document.getElementById("listaRespostas");       
    if(listaRespostas.querySelector('.selected') && selecionado == false){
        selecionado = true;

    
        if(listaRespostas.querySelector('.selected') == listaRespostas.querySelector('.true')){        
            acertos++;
            listaRespostas.querySelector('.selected').classList.add('check');
            document.getElementById("score").textContent = `Acertos: ${acertos}  Erros: ${erros}`;
        }else{
            erros++; 
            listaRespostas.querySelector('.selected').classList.add('check');
            document.getElementById("score").textContent = `Acertos: ${acertos}  Erros: ${erros}`;   
        }
        if(listaRespostas.querySelector('.true')){        
            listaRespostas.querySelector('.true').classList.add('check');
            listaRespostas.querySelector('.true').classList.add('selected2');
        }
    //gerarPergunta();
    }
    

}

function reset(){
    acertos = 0;
    erros = 0;
    selecionado = true;
    const listaRespostas = document.getElementById("listaRespostas");        
    while (listaRespostas.firstChild) {
        listaRespostas.removeChild(listaRespostas.firstChild);
    }
    document.getElementById("score").textContent = `Acertos: ${acertos}  Erros: ${erros}`;  
    document.getElementById("caixaPergunta").textContent = "...";
    goToStartScreen();

}
