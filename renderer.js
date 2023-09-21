// Use o evento DOMContentLoaded para garantir que o código seja executado após o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
    // Selecione todos os elementos de entrada (input) no formulário
    const formInputs = document.querySelectorAll('input');
  
    // Selecione o botão de envio
    const submitButton = document.getElementById('submit-btn');
  
    // Selecione o elemento de resultado
    const resultadoElement = document.getElementById('resultado');
  
    // Função para verificar se todos os campos estão preenchidos
    function checkFields() {
      let allFieldsFilled = true;
  
      formInputs.forEach((input) => {
        if (input.value.trim() === '') {
          allFieldsFilled = false;
        }
      });
  
      return allFieldsFilled;
    }
  
    // Função para habilitar ou desabilitar o botão de envio com base no preenchimento dos campos
    function toggleSubmitButton() {
      if (checkFields()) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    }
  
    // Adicione um ouvinte de eventos "input" a todos os campos de entrada para verificar quando eles mudam
    formInputs.forEach((input) => {
      input.addEventListener('input', toggleSubmitButton);
    });
  
    // Desabilite o botão de envio inicialmente
    submitButton.disabled = true;
  
    // Adicione um ouvinte de eventos "click" ao botão de envio
    submitButton.addEventListener('click', function () {
      // Verifique se todos os campos estão preenchidos antes de fazer a requisição
      if (checkFields()) {
        fazerRequisicao();
      } else {
        alert("Por favor, preencha todos os campos antes de enviar.");
      }
    });
});

// Função para fazer a requisição AJAX
function fazerRequisicao() {
    // Defina os dados que deseja enviar para a API com base nos valores dos campos do formulário
    var data = {
        sex: document.querySelector('input[name="sex"]:checked').value,
        redo: document.querySelector('input[name="redo"]:checked').value,
        cpb: document.querySelector('input[name="cpb"]:checked').value,
        age: parseFloat(document.getElementById('age').value),
        bsa: parseFloat(document.getElementById('bsa').value),
        hb: parseFloat(document.getElementById('hb').value)
    };

    // Faça uma solicitação AJAX para a API Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/predict", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // A resposta da API está no formato JSON
                var resposta = JSON.parse(xhr.responseText);
                
                // Exiba a resposta na página
                document.getElementById("resultado").innerHTML = "Previsão: " + resposta.prediction;
            } else {
                // Exiba uma mensagem de erro em caso de falha na requisição
                alert("Ocorreu um erro ao fazer a solicitação.");
            }
        }
    };

    // Converta os dados em JSON e envie a solicitação
    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}
