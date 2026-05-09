import { getContatos } from "./contatos.js"

import {
    criarContato,
    atualizarContato,
    deletarContato
} from "./contatos.js"

import "./preview.js"


const contatosContainer = document.getElementById("contatos-container")
const form = document.getElementById("form-contato")

const campoId = document.getElementById("contato-id")
const campoNome = document.getElementById("nome")
const campoCelular = document.getElementById("celular")
const campoFoto = document.getElementById("foto")
const campoEmail = document.getElementById("email")
const campoEndereco = document.getElementById("endereco")
const campoCidade = document.getElementById("cidade")

async function carregarContatos() {

    try {

        const contatos = await getContatos()

        contatosContainer.innerHTML = ""

        contatos.forEach(criarCard)

    } catch(error){

        contatosContainer.innerHTML =
        `<p>Erro ao carregar contatos</p>`
    }
}

function criarCard(contato){

    const card = document.createElement("div")

    card.classList.add("card-contato")

    card.innerHTML = `
    
        <img 
    src="${contato.foto || './img/sem-imagem.png'}" 
    alt="${contato.nome}"
    onerror="this.src='./img/sem-imagem.png'"
>

        <h3>${contato.nome}</h3>

        <p>${contato.celular}</p>

        <p>${contato.email}</p>

        <p>${contato.endereco}</p>

        <p>${contato.cidade}</p>

        <div class="acoes">
        
            <button class="btn-editar">
                Editar
            </button>

            <button class="btn-excluir">
                Excluir
            </button>

        </div>
    `

    const btnEditar = card.querySelector(".btn-editar")
    const btnExcluir = card.querySelector(".btn-excluir")

    btnEditar.addEventListener("click", () => {

        campoId.value = contato.id
        campoNome.value = contato.nome
        campoCelular.value = contato.celular
        campoFoto.value = contato.foto
        campoEmail.value = contato.email
        campoEndereco.value = contato.endereco
        campoCidade.value = contato.cidade
    })

    btnExcluir.addEventListener("click", async () => {

        const confirmar = confirm(`Deseja excluir ${contato.nome}?`)

        if(confirmar){

            await deletarContato(contato.id)

            carregarContatos()
        }
    })

    contatosContainer.appendChild(card)
}

form.addEventListener("submit", async (event) => {

    event.preventDefault()

    const contato = {

        nome: campoNome.value,
        celular: campoCelular.value,
        foto: campoFoto.value,
        email: campoEmail.value,
        endereco: campoEndereco.value,
        cidade: campoCidade.value
    }

    try{

        if(campoId.value){

            await atualizarContato(campoId.value, contato)

        } else {

            await criarContato(contato)
        }

        form.reset()

        campoId.value = ""

        carregarContatos()

    } catch(error){

        alert("Erro ao salvar contato")
    }
})

carregarContatos()