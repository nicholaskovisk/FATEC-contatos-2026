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