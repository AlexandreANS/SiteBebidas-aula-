let fornecedores = JSON.parse(localStorage.getItem("fornecedores"));
let idEditando = null;

if (fornecedores === null) {
    fornecedores = [];
    carregarInicial();
}

function listar() {
    renderizar(fornecedores);
}

function renderizar(lista) {
    let linhas = "";

    for (let i = 0; i < lista.length; i++) {
        const forn = lista[i];
        linhas += `<tr>
        <td>${forn.id}</td>
        <td>${forn.nome}</td>
        <td>${forn.cidade}</td>
        <td>${forn.contato}</td>
        <td><a href="#" class="link" onclick="editar(${forn.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${forn.id})">Excluir</a></td>
        </tr>`;
    }

    if (lista.length === 0) {
        linhas = `<tr><td colspan="6" class="empty-row">Nenhum fornecedor encontrado.</td></tr>`;
    }

    document.getElementById("tabela").innerHTML = linhas;
}

function filtrar() {
    const termo = document.getElementById("filtro").value.toLowerCase();

    const filtrados = fornecedores.filter(forn =>
        forn.nome.toLowerCase().includes(termo) ||
        forn.cidade.toLowerCase().includes(termo)
    );

    renderizar(filtrados);
}

function carregarInicial() {
    const inicial = [
        { nome: "Ambev Distribuidora", cidade: "São Paulo", contato: "(11) 9999-0001" },
        { nome: "Heineken Brasil", cidade: "Rio de Janeiro", contato: "(21) 9999-0002" },
        { nome: "PepsiCo", cidade: "Porto Alegre", contato: "(51) 9999-0003" },
        { nome: "Red Bull Brasil", cidade: "Curitiba", contato: "(41) 9999-0004" },
        { nome: "Bebidas do Sul", cidade: "Porto Alegre", contato: "(51) 9999-0005" },
        { nome: "Distribuidora Central", cidade: "Belo Horizonte", contato: "(31) 9999-0006" },
    ];

    inicial.forEach((item, i) => {
        fornecedores.push({ id: Date.now() + i, ...item });
    });

    salvar();
}

function adicionar() {
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const contato = document.getElementById("contato").value;

    const novo = { id: Date.now(), nome, cidade, contato };
    fornecedores.push(novo);
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    window.location.href = "fornecedores.html";
}

function editar(id) {
    const forn = fornecedores.find(f => f.id === id);
    idEditando = id;

    document.getElementById("edit-nome").value = forn.nome;
    document.getElementById("edit-cidade").value = forn.cidade;
    document.getElementById("edit-contato").value = forn.contato;

    abrirModal();
}

function salvarEdicao() {
    const forn = fornecedores.find(f => f.id === idEditando);

    forn.nome = document.getElementById("edit-nome").value;
    forn.cidade = document.getElementById("edit-cidade").value;
    forn.contato = document.getElementById("edit-contato").value;

    salvar();
    fecharModal();
}

function abrirModal() {
    document.getElementById("modalEditar").classList.add("aberto");
}

function fecharModal() {
    document.getElementById("modalEditar").classList.remove("aberto");
    idEditando = null;
}

function remover(id) {
    fornecedores = fornecedores.filter(f => f.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    listar();
}
