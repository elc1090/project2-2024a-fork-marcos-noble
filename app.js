function fetchQuestion() {
    fetch("https://quizapi.io/api/v1/questions?apiKey=SEzVACg9eCGTTmfHeqOj0x3xG6XlmyOb04DTgitf&limit=1")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const pergunta = data[0].question;
        const respostas = Object.values(data[0].answers);
        const respostasBool = Object.values(data[0].correct_answers);
        const multipla = data[0].multiple_correct_answers;
        console.log(multipla) //saber se é de multipla escolha

        //Mostra a pergunta no elemento 
        document.getElementById("caixaPergunta").textContent = pergunta;

        //Limpa as opções 
        const answerContainer = document.getElementById("listaRespostas");
        //answerContainer.innerHTML="";
        while (answerContainer.firstChild) {
            answerContainer.removeChild(answerContainer.firstChild);
        }

        // Create and append answer elements
        respostas.forEach(answer => {
            if(answer != null){
                const answerElement = document.createElement("li");
                answerElement.textContent = answer;
                answerElement.addEventListener('click', () => {     
                    if(answerContainer.querySelector('.selected')){
                        const activeOption = answerContainer.querySelector('.selected');
                        activeOption.classList.remove('selected');
                    }
                    answerElement.classList.add('selected');                                            
                });                    
                answerContainer.appendChild(answerElement);
            }
            
        });      
    })
    .catch(err => console.error(err));
}
