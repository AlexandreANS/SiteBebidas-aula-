let categorias = JSON.parse(localStorage.getItem("categorias"));
let idEditando = null;

if (categorias === null) {
    categorias = [];
    carregarInicial();
}

function listar() {
    renderizar(categorias);
}

function renderizar(lista) {
    let linhas = "";

    for (let i = 0; i < lista.length; i++) {
        const cat = lista[i];
        linhas += `<tr>
        <td>${cat.id}</td>
        <td>${cat.nome}</td>
        <td>${cat.descricao}</td>
        <td>${cat.temperatura}</td>
        <td><a href="#" class="link" onclick="editar(${cat.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${cat.id})">Excluir</a></td>
        </tr>`;
    }

    if (lista.length === 0) {
        linhas = `<tr><td colspan="6" class="empty-row">Nenhuma categoria encontrada.</td></tr>`;
    }

    document.getElementById("tabela").innerHTML = linhas;
}

function filtrar() {
    const termo = document.getElementById("filtro").value.toLowerCase();

    const filtradas = categorias.filter(cat =>
        cat.nome.toLowerCase().includes(termo) ||
        cat.descricao.toLowerCase().includes(termo)
    );

    renderizar(filtradas);
}

function carregarInicial() {
    const inicial = [
        { nome: "Cerveja", descricao: "Bebidas fermentadas de cevada", temperatura: "0°C a 4°C" },
        { nome: "Refrigerante", descricao: "Bebidas gaseificadas não alcoólicas", temperatura: "2°C a 6°C" },
        { nome: "Ice", descricao: "Bebidas alcoólicas geladas saborizadas", temperatura: "0°C a 4°C" },
        { nome: "Energético", descricao: "Bebidas com cafeína e taurina", temperatura: "4°C a 8°C" },
        { nome: "Suco", descricao: "Sucos naturais e nectares", temperatura: "4°C a 8°C" },
        { nome: "Vinho", descricao: "Vinhos tintos, brancos e rosés", temperatura: "8°C a 18°C" },
    ];

    inicial.forEach((item, i) => {
        categorias.push({ id: Date.now() + i, ...item });
    });

    salvar();
}

function adicionar() {
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const temperatura = document.getElementById("temperatura").value;

    const nova = { id: Date.now(), nome, descricao, temperatura };
    categorias.push(nova);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    window.location.href = "categorias.html";
}

function editar(id) {
    const cat = categorias.find(c => c.id === id);
    idEditando = id;

    document.getElementById("edit-nome").value = cat.nome;
    document.getElementById("edit-descricao").value = cat.descricao;
    document.getElementById("edit-temperatura").value = cat.temperatura;

    abrirModal();
}

function salvarEdicao() {
    const cat = categorias.find(c => c.id === idEditando);

    cat.nome = document.getElementById("edit-nome").value;
    cat.descricao = document.getElementById("edit-descricao").value;
    cat.temperatura = document.getElementById("edit-temperatura").value;

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
    categorias = categorias.filter(c => c.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("categorias", JSON.stringify(categorias));
    listar();
}
