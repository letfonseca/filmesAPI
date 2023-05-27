const form = document.querySelector('#filmesform')
const tituloInput = document.querySelector('#tituloInput')
const diretorInput = document.querySelector('#diretorInput')
const generoInput = document.querySelector('#generoInput')
const ano_lancamentoInput = document.querySelector('#ano_lancamentoInput')
const URL = 'http://localhost:8080/filmes.php'

const tableBody = document.querySelector('#filmestable')

function carregarFilmes() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(filmes => {
            tableBody.innerHTML = ''

            for (let i = 0; i < filmes.length; i++) {
                const tr = document.createElement('tr')
                const filme = filmes[i]
                tr.innerHTML = `
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.genero}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>
                    <button data-id="$(filme.id)"onclick="atualizarFilmes(${filme.id})">Editar</button>
                    <button onclick="excluirFilme(${filme.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um filme
function adicionarFilmes(event) {

    event.preventDefault()

    const titulo = tituloInput.value
    const diretor = diretorInput.value
    const genero = generoInput.value
    const ano_lancamento = ano_lancamentoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&diretor=${encodeURIComponent(diretor)}&genero=${encodeURIComponent(genero)}&ano_lancamento=${encodeURIComponent(ano_lancamento)}`
    })
        .then(response => {
            if (response.ok) {
                carregarFilmes()
                tituloInput.value = ''
                diretorInput.value = ''
                generoInput.value = ''
                ano_lancamentoInput.value = ''
            } else {
                console.error('Erro ao adicionar filme')
                alert('Erro ao add filme')
            }
        })
}

function atualizarFilmes(id){
    const novoTitulo = prompt("Digite o novo titulo")
    const novoDiretor = prompt("Digite o novo Diretor")
    const novoGenero = prompt("Digite o novo Genero")
    const novoAno = prompt("Digite o novo ano")
    if (novoTitulo && novoAno && novoDiretor && novoGenero){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `titulo=${encodeURIComponent(novoTitulo)}&diretor=${encodeURIComponent(novoDiretor)}&genero=${encodeURIComponent(novoGenero)}&ano_lancamento=${encodeURIComponent(novoAno)}`
        })
            .then(response => {
                if(response.ok){
                    carregarFilmes()
                } else {
                    console.error('Erro ao att filme')
                    alert('erro ao att filme')
                }
            })
    }
}


function excluirFilme(id){
    if(confirm('Deseja excluir esse Filme?')){
        fetch(`${URL}?id=${id}`,{
            method:'DELETE'
        })
        .then(response => {
            if(response.ok){
                carregarFilmes()
            }else{
                console.error('Erro ao excluir o filme')
                alert('Erro ao excluir filme')
            }
        })
    }
}

form.addEventListener('submit', adicionarFilmes)

carregarFilmes()
