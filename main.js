// ============================================
// AULA 1, 2, 3, 4, 5, 6, 7, 8, 9 - COMPLETO
// Gerador de Senhas - Mayla
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
const especiaisAvancados = '#$&+-=_{}[]<>/|~'; // AULA 2
const caracteresAmbiguos = '0OIl'; // AULA 2

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// ============================================
// AULA 1 - Botões com hover personalizado
// ============================================
const botoes = document.querySelectorAll('.parametro-senha__botao');
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
// AULA 4 - Atualizar botões gerar
// ============================================
function atualizarBotoesGerar() {
    const desabilitado = tamanhoSenha < 6;
    btnGerar.disabled = desabilitado;
    btnGerarForte.disabled = desabilitado;
    
    if (desabilitado) {
        avisoSenha.style.display = 'block';
    } else {
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
    
    // Usando navigator.clipboard com fallback
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
// AULA 5 - Função para misturar maiúsculas e minúsculas
// ============================================
function misturarCase(senha) {
    let senhaMisturada = '';
    for (let i = 0; i < senha.length; i++) {
        const char = senha[i];
        if (char >= 'A' && char <= 'Z') {
            // já é maiúscula, às vezes mantém, às vezes converte
            senhaMisturada += Math.random() > 0.5 ? char : char.toLowerCase();
        } else if (char >= 'a' && char <= 'z') {
            // já é minúscula, às vezes mantém, às vezes converte
            senhaMisturada += Math.random() > 0.5 ? char : char.toUpperCase();
        } else {
            senhaMisturada += char;
        }
    }
    return senhaMisturada;
}

// ============================================
// Função principal de geração de senha
// ============================================
function geraSenha() {
    let alfabeto = '';
    
    // AULA 2 - Checkboxes originais + novos
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }
    if (checkbox[4].checked) { // Especiais avançados
        alfabeto += especiaisAvancados;
    }
    
    // AULA 6 - Evitar caracteres ambíguos
    if (checkbox[5].checked) {
        for (let char of caracteresAmbiguos) {
            alfabeto = alfabeto.replaceAll(char, '');
        }
    }
    
    // Se o alfabeto estiver vazio, não gerar senha
    if (alfabeto.length === 0) {
        campoSenha.value = 'Selecione uma opção';
        forcaSenha.className = 'forca';
        entropiaTexto.textContent = '';
        return;
    }
    
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    // AULA 5 - Misturar maiúsculas e minúsculas
    senha = misturarCase(senha);
    
    campoSenha.value = senha;
    
    // AULA 8 - Calcular entropia
    calcularEntropia(alfabeto.length);
}

// ============================================
// AULA 8 - Entropia Detalhada
// ============================================
function calcularEntropia(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    const forca = classificaSenha(entropia);
    
    let textoEntropia = '';
    let icone = '';
    let unidade = '';
    let valor = 0;
    
    if (forca === 'super-forte') {
        // Entropia > 65 bits
        const anos = Math.floor(2**entropia / (100e6 * 60 * 60 * 24 * 365));
        icone = '🛡️';
        unidade = 'anos';
        valor = anos || 'mais de 1 milhão';
        textoEntropia = `${icone} Um computador pode levar aproximadamente ${valor} ${unidade} para descobrir esta senha! (Entropia: ${Math.round(entropia)} bits)`;
    } else if (forca === 'forte') {
        // Entropia > 52 bits
        const dias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));
        icone = '⏳';
        unidade = 'dias';
        valor = dias || 'menos de 1';
        textoEntropia = `${icone} Um computador pode levar aproximadamente ${valor} ${unidade} para descobrir esta senha! (Entropia: ${Math.round(entropia)} bits)`;
    } else {
        // Fraca ou Média - Entropia ≤ 52 bits
        const horas = Math.floor(2**entropia / (100e6 * 60 * 60));
        icone = '⚠️';
        unidade = 'horas';
        valor = horas || 'menos de 1';
        textoEntropia = `${icone} Um computador pode levar aproximadamente ${valor} ${unidade} para descobrir esta senha! (Entropia: ${Math.round(entropia)} bits)`;
    }
    
    entropiaTexto.textContent = textoEntropia;
}

// ============================================
// AULA 3 - Classificação da força da senha
// ============================================
function classificaSenha(entropia) {
    forcaSenha.classList.remove('fraca', 'media', 'forte', 'super-forte');
    
    let nivel = '';
    if (entropia > 65) {
        forcaSenha.classList.add('super-forte');
        nivel = 'super-forte';
    } else if (entropia > 52) {
        forcaSenha.classList.add('forte');
        nivel = 'forte';
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
        nivel = 'media';
    } else {
        forcaSenha.classList.add('fraca');
        nivel = 'fraca';
    }
    
    return nivel;
}

// ============================================
// AULA 6 - Gerar Senha Forte
// ============================================
function gerarSenhaForte() {
    // Ativar todos os checkboxes (menos o de evitar ambíguos)
    checkbox[0].checked = true; // Maiúsculas
    checkbox[1].checked = true; // Minúsculas
    checkbox[2].checked = true; // Números
    checkbox[3].checked = true; // Símbolos
    checkbox[4].checked = true; // Especiais avançados
    // checkbox[5] NÃO ativar (evitar ambíguos)
    
    // Garantir no mínimo 12 caracteres
    if (tamanhoSenha < 12) {
        tamanhoSenha = 12;
        numeroSenha.textContent = tamanhoSenha;
    }
    
    atualizarBotoesGerar();
    geraSenha();
}

// ============================================
// AULA 4 - Eventos dos botões
// ============================================
btnGerar.onclick = geraSenha;
btnGerarForte.onclick = gerarSenhaForte;

// ============================================
// AULA 7 - Classificação de Idade
// ============================================
btnClassificar.onclick = function() {
    const idade = parseInt(campoIdade.value);
    
    if (isNaN(idade) || idade < 0 || idade > 120) {
        resultadoIdade.textContent = '⚠️ Por favor, digite uma idade válida (0-120)';
        barraIdade.style.width = '0%';
        return;
    }
    
    let classificacao = '';
    let percentual = 0;
    let emoji = '';
    
    if (idade < 12) {
        classificacao = 'Criança';
        percentual = 25;
        emoji = '🧒';
    } else if (idade >= 12 && idade <= 17) {
        classificacao = 'Adolescente';
        percentual = 50;
        emoji = '🧑';
    } else {
        classificacao = 'Adulto';
        percentual = 100;
        emoji = '👨';
    }
    
    barraIdade.style.width = percentual + '%';
    resultadoIdade.textContent = `${emoji} Classificação: ${classificacao} (${idade} anos)`;
};

// =========================================
