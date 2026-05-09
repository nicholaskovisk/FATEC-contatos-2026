'use strict'

const inputImagem = document.getElementById('preview-input')
const previewImage = document.getElementById('preview-image')
const campoFoto = document.getElementById('foto')

function preview({ target }) {

    const arquivo = target.files[0]

    if (!arquivo) return

    // Mostra preview da imagem
    previewImage.src = URL.createObjectURL(arquivo)

    // Caminho da pasta img
    const caminhoImagem = `./img/${arquivo.name}`

    // Preenche automaticamente o campo foto
    campoFoto.value = caminhoImagem
}

inputImagem.addEventListener('change', preview)

// Cria a área da imagem na direita
const painelPreview = document.createElement("div");

painelPreview.id = "painel-preview";

painelPreview.innerHTML = `
    <img id="imagem-preview" src="" alt="Preview">
`;

document.body.appendChild(painelPreview);


// Função global para trocar a imagem
window.mostrarPreview = function(nomeImagem){

    const imagem = document.getElementById("imagem-preview");

    // abre automaticamente a pasta img
    imagem.src = `img/${nomeImagem}`;
}