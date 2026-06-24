// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const especiaisAvancados = '#$&+-=_{}[]<>/|~'; // AULA 6
const caracteresAmbiguos = '0OIl'; // AULA 6

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('#barra-forca');
const btnGerar = document.querySelector('#btn-gerar-senha');
const btnGerarForte = document.querySelector('#btn-gerar-forte');
const btnCopiar = document.querySelector('#botao-copiar');
const tamanhoAviso = document.querySelector('#tamanho-aviso');

// AULA 7: Elementos de idade
const inputIdade = document.querySelector('#input-idade');
const btnClassificarIdade = document.querySelector('#btn-classificar-idade');
const barraIdade = document.querySelector('#barra-idade');
const idadeResultado = document.querySelector('#idade-resultado');

// ============================================
// AULA 4: FUNÇÕES DE TAMANHO
// ============================================
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    // ✅ PRIMEIRO atualiza os botões, DEPOIS gera a senha
    verificarBotaoGerar();
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    // ✅ PRIMEIRO atualiza os botões, DEPOIS gera a senha
    verificarBotaoGerar();
    geraSenha();
}

// ============================================
// ✅ AULA 4: CONTROLE DO BOTÃO GERAR SENHA (CORRIGIDO)
// ============================================
function verificarBotaoGerar() {
    // REGRA: Desativar quando tamanho for MENOR que 6
    const desabilitado = tamanhoSenha < 6;
    
    // Aplicar desativação nos botões
    btnGerar.disabled = desabilitado;
    btnGerarForte.disabled = desabilitado;
    
    // Adicionar/remover classe para mudar a cor (cinza quando desativado)
    if (desabilitado) {
        btnGerar.classList.add('btn-desativado');
        btnGerarForte.classList.add('btn-desativado');
        tamanhoAviso.textContent = '⚠️ Mínimo de 6 caracteres para gerar senha!';
        tamanhoAviso.style.color = '#c45a4a';
    } else {
        btnGerar.classList.remove('btn-desativado');
        btnGerarForte.classList.remove('btn-desativado');
        tamanhoAviso.textContent = '';
    }
}

// ============================================
// AULA 5: GERAR SENHA
// ============================================
function geraSenha() {
    let alfabeto = '';
    
    if (checkbox[0].checked) { // Maiúsculas
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) { // Minúsculas
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) { // Números
        alfabeto += numeros;
    }
    if (checkbox[3].checked) { // Símbolos
        alfabeto += simbolos;
    }
    if (checkbox[4].checked) { // AULA 6: Especiais avançados
        alfabeto += especiaisAvancados;
    }
    
    // AULA 6: Remover caracteres ambíguos
    if (checkbox[5].checked) {
        for (let char of caracteresAmbiguos) {
            alfabeto = alfabeto.replaceAll(char, '');
        }
    }
    
    if (alfabeto.length === 0) {
        alfabeto = letrasMaiusculas;
        checkbox[0].checked = true;
    }
    
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// ============================================
// AULA 3 + AULA 8: CLASSIFICAÇÃO DE FORÇA
// ============================================
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    // Reseta as classes visuais da barra eliminando travamentos
    forcaSenha.className = 'forca';
    
    if (entropia > 65) {
        forcaSenha.classList.add('super-forte');
    } else if (entropia > 52) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 47) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    const valorEntropia = document.querySelector('.entropia');
    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    const anos = Math.floor(dias / 365);
    
    if (dias > 365) {
        const anosFormatados = anos.toLocaleString('pt-BR');
        valorEntropia.textContent = `🛡️ Um computador pode levar aproximadamente ${anosFormatados} anos para descobrir esta senha! (Entropia: ${entropia.toFixed(1)} bits)`;
    } else if (dias > 1) {
        valorEntropia.textContent = `⏳ Um computador pode levar aproximadamente ${dias} dias para descobrir esta senha! (Entropia: ${entropia.toFixed(1)} bits)`;
    } else {
        let horas = Math.floor(2 ** entropia / (100e6 * 60 * 60));
        if (horas < 1) horas = 1; 
        valorEntropia.textContent = `⚠️ Um computador pode levar aproximadamente ${horas} hora(s) para descobrir esta senha! (Entropia: ${entropia.toFixed(1)} bits)`;
    }
}

// ============================================
// AULA 6: GERAR SENHA FORTE
// ============================================
function geraSenhaForte() {
    const todosCaracteres = letrasMaiusculas + letrasMinusculas + numeros + simbolos + especiaisAvancados;
    let senha = '';
    const comprimento = Math.max(tamanhoSenha, 12);
    
    for (let i = 0; i < comprimento; i++) {
        const idx = Math.floor(Math.random() * todosCaracteres.length);
        senha += todosCaracteres[idx];
    }
    
    if (comprimento > tamanhoSenha) {
        tamanhoSenha = comprimento;
        numeroSenha.textContent = tamanhoSenha;
        verificarBotaoGerar();
    }
    
    checkbox.forEach((chk, index) => {
        if (index < 5) chk.checked = true;
    });
    campoSenha.value = senha;
    classificaSenha(todosCaracteres.length);
}

// ============================================
// AULA 7: CLASSIFICAÇÃO DE IDADE
// ============================================
function classificarIdade() {
    const idade = parseInt(inputIdade.value);
    
    if (isNaN(idade) || idade < 0) {
        idadeResultado.textContent = '⚠️ Digite uma idade válida!';
        return;
    }
    
    let classificacao = '';
    let classeCSS = '';
    
    if (idade < 12) {
        classificacao = 'Criança 🧒';
        classeCSS = 'crianca';
    } else if (idade >= 12 && idade < 18) {
        classificacao = 'Adolescente 🧑';
        classeCSS = 'adolescente';
    } else {
        classificacao = 'Adulto 👨';
        classeCSS = 'adulto';
    }
    
    barraIdade.className = 'idade-barra ' + classeCSS;
    idadeResultado.textContent = `Classificação: ${classificacao} (${idade} anos)`;
}

// ============================================
// AULA 9: COPIAR SENHA
// ============================================
function copiarSenha() {
    const senha = campoSenha.value;
    if (senha) {
        navigator.clipboard.writeText(senha).then(() => {
            btnCopiar.textContent = '✅';
            setTimeout(() => {
                btnCopiar.textContent = '📋';
            }, 2000);
        }).catch(() => {
            campoSenha.select();
            document.execCommand('copy');
            btnCopiar.textContent = '✅';
            setTimeout(() => {
                btnCopiar.textContent = '📋';
            }, 2000);
        });
    }
}

// ============================================
// EVENTOS
// ============================================
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

btnGerar.onclick = geraSenha;
btnGerarForte.onclick = geraSenhaForte;
btnCopiar.onclick = copiarSenha;
btnClassificarIdade.onclick = classificarIdade;

inputIdade.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') classificarIdade();
});

// ============================================
// ✅ INICIALIZAÇÃO (CORRIGIDA)
// ============================================
// 1º Verifica o estado dos botões
verificarBotaoGerar();
// 2º Gera a senha inicial
geraSenha();
// 3º Classifica a idade inicial
classificarIdade();
// 4º Ano no footer
document.querySelector('#ano-atual').textContent = new Date().getFullYear();