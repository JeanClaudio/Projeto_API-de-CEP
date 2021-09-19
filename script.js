'use strict'
const limparFormulario = (value) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
const preencherFormulario = (value) =>{
    document.getElementById('endereco').value = value.logradouro;
    document.getElementById('bairro').value = value.bairro;
    document.getElementById('cidade').value = value.localidade;
    document.getElementById('estado').value = value.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
 
 const pesquisarCep = async()=>{
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('cep').value = '';
            alert("CEP inválido!!! tente novamente.");
        }else{
            preencherFormulario(endereco);
        };
    }else{
        document.getElementById('endereco').value = 'CEP incorreto tente novamente';
    }

    
 }
document.getElementById('cep').addEventListener('focusout', pesquisarCep);