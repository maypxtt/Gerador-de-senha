// ============================================
// AULA 1, 2, 3, 4, 5, 6, 7, 8, 9 - COMPLETO
// Gerador de Senhas - Mayla (CORRIGIDO - AULA 4)
// ============================================

// Elementos DOM
const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const avisoSenha = document.querySelector('#avisoSenha');
const btnGerar = document.querySelector('#btnGerar');
const btnGerarForte = document.querySelector('#btnGerarForte');
const btnCopiar = document.querySelector('#btnCopiar');
const entropiaTexto = document.querySelector('#entropiaTexto');

// Elementos da classificação de idade - AULA 7
const campoIdade = document.querySelector('#campoIdade');
const btnClassificar = document.querySelector('#btnClassificar');
const barraIdade = document.querySelector('.barra-idade__preenchimento');
const resultadoIdade = document.querySelector('#resultadoIdade');

// Conjuntos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const especiaisAvancados = '#$&+-=_{}[]<>/|~';
const caracteresAmbiguos = '0OIl';

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// ============================================
// AULA 1 - Botões com hover personalizado
// ============================================
const btnDiminuir = document.querySelector('#btnDiminuir');
const btnAumentar = document.querySelector('#btnAumentar');

btnDiminuir.onclick = diminuiTamanho;
btnAumentar.onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    atualizarBotoesGerar(); // AULA 4
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    atualizarBotoesGerar(); // AULA 4
    geraSenha();
}

// ============================================
// ✅ AULA 4 - Atualizar botões gerar (CORRIGIDO)
// ============================================
function atualizarBotoesGerar() {
    // REGRA: Desativar quando tamanho for MENOR que 6
    const desabilitado = tamanhoSenha < 6;
    
    // Aplicar desativação nos botões
    btnGerar.disabled = desabilitado;
    btnGerarForte.disabled = desabilitado;
    
    // Adicionar/remover classe para mudar a cor (cinza quando desativado)
    if (desabilitado) {
        btnGerar.classList.add('btn-desativado');
        btnGerarForte.classList.add('btn-desativado');
        avisoSenha.style.display = 'block';
        avisoSenha.textContent = '⚠️ Mínimo de 6 caracteres para gerar senha!';
    } else {
        btnGerar.classList.remove('btn-desativado');
        btnGerarForte.classList.remove('btn-desativado');
        avisoSenha.style.display = 'none';
    }
}

// ============================================
// AULA 2 - Checkboxes
// ============================================
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// ============================================
// AULA 9 - Botão Copiar
// ============================================
btnCopiar.onclick = function() {
    const senha = campoSenha.value;
    if (!senha) return;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(senha).then(() => {
            feedbackCopiar();
        }).catch(() => {
            fallbackCopiar(senha);
        });
    } else {
        fallbackCopiar(senha);
    }
};

function feedbackCopiar() {
    btnCopiar.textContent = '✅';
    btnCopiar.classList.add('copiado');
    setTimeout(() => {
        btnCopiar.textContent = '📋';
        btnCopiar.classList.remove('copiado');
    }, 2000);
}

function fallbackCopiar(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        feedbackCopiar();
    } catch (err) {
        alert('Não foi possível copiar a senha. Copie manualmente.');
    }
    document.body.removeChild(textarea);
}

// ============================================
// AULA 5 - Função para misturar maiúsculas e minúsculas (CORRIGIDA)
// ============================================
function misturarCase(senha, temMaiusculas, temMinusculas) {
