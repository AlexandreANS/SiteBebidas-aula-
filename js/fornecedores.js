let fornecedores = JSON.parse(localStorage.getItem("fornecedores"));

if (fornecedores === null) {
    fornecedores = [];
    carregarInicial();
}

function listar() {
    let linhas = "";

    for (let i = 0; i < fornecedores.length; i++) {
        const forn = fornecedores[i];
        linhas += `<tr>
        <td>${forn.id}</td>
        <td>${forn.nome}</td>
        <td>${forn.cidade}</td>
        <td>${forn.contato}</td>
        <td><a href="#" class="link" onclick="editar(${forn.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${forn.id})">Excluir</a></td>
        </tr>`;
    }
    document.getElementById("tabela").innerHTML = linhas;
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
    salvar();
}

function editar(id) {
    const forn = fornecedores.find(f => f.id === id);

    forn.nome = prompt("Novo nome:", forn.nome);
    forn.cidade = prompt("Nova cidade:", forn.cidade);
    forn.contato = prompt("Novo contato:", forn.contato);

    salvar();
}

function remover(id) {
    fornecedores = fornecedores.filter(f => f.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    listar();
}
