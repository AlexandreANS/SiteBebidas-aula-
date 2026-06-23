let bebidas = JSON.parse(localStorage.getItem("bebidas"));
let idEditando = null;

if (bebidas === null) {
    bebidas = [];
    carregarInicial();
}

function listar() {
    renderizar(bebidas);
}

function renderizar(lista) {
    let linhas = "";

    for (let i = 0; i < lista.length; i++) {
        const beb = lista[i];
        const imagem = beb.imagem ? beb.imagem : "https://placehold.co/80x80?text=%F0%9F%8D%BA";

        linhas += `<tr>
        <td>${beb.id}</td>
        <td><img src="${imagem}" alt="${beb.nome}" class="thumb"></td>
        <td>${beb.nome}</td>
        <td>${beb.categoria}</td>
        <td>${beb.volume}</td>
        <td>R$ ${parseFloat(beb.preco).toFixed(2)}</td>
        <td><a href="#" class="link" onclick="editar(${beb.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${beb.id})">Excluir</a></td>
        </tr>`;
    }

    if (lista.length === 0) {
        linhas = `<tr><td colspan="8" class="empty-row">Nenhuma bebida encontrada.</td></tr>`;
    }

    document.getElementById("tabela").innerHTML = linhas;
}

function filtrar() {
    const termo = document.getElementById("filtro").value.toLowerCase();

    const filtradas = bebidas.filter(beb =>
        beb.nome.toLowerCase().includes(termo) ||
        beb.categoria.toLowerCase().includes(termo)
    );

    renderizar(filtradas);
}

function carregarInicial() {
    const inicial = [
        { nome: "Heineken", categoria: "Cerveja", volume: "350ml", preco: "6.50", imagem: "https://placehold.co/200x200?text=Heineken" },
        { nome: "Skol", categoria: "Cerveja", volume: "350ml", preco: "4.00", imagem: "https://placehold.co/200x200?text=Skol" },
        { nome: "Coca-Cola", categoria: "Refrigerante", volume: "350ml", preco: "5.00", imagem: "https://placehold.co/200x200?text=Coca-Cola" },
        { nome: "Smirnoff Ice", categoria: "Ice", volume: "275ml", preco: "8.00", imagem: "https://placehold.co/200x200?text=Smirnoff+Ice" },
        { nome: "Devassa", categoria: "Cerveja", volume: "350ml", preco: "5.50", imagem: "https://placehold.co/200x200?text=Devassa" },
        { nome: "Red Bull", categoria: "Energético", volume: "250ml", preco: "12.00", imagem: "https://placehold.co/200x200?text=Red+Bull" },
    ];

    inicial.forEach((item, i) => {
        bebidas.push({ id: Date.now() + i, ...item });
    });

    salvar();
}

function adicionar() {
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const volume = document.getElementById("volume").value;
    const preco = document.getElementById("preco").value;
    const imagem = document.getElementById("imagem").value;

    const nova = { id: Date.now(), nome, categoria, volume, preco, imagem };
    bebidas.push(nova);
    salvar();
}

function editar(id) {
    const beb = bebidas.find(b => b.id === id);
    idEditando = id;

    document.getElementById("edit-nome").value = beb.nome;
    document.getElementById("edit-categoria").value = beb.categoria;
    document.getElementById("edit-volume").value = beb.volume;
    document.getElementById("edit-preco").value = beb.preco;
    document.getElementById("edit-imagem").value = beb.imagem || "";

    abrirModal();
}

function salvarEdicao() {
    const beb = bebidas.find(b => b.id === idEditando);

    beb.nome = document.getElementById("edit-nome").value;
    beb.categoria = document.getElementById("edit-categoria").value;
    beb.volume = document.getElementById("edit-volume").value;
    beb.preco = document.getElementById("edit-preco").value;
    beb.imagem = document.getElementById("edit-imagem").value;

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
    bebidas = bebidas.filter(b => b.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("bebidas", JSON.stringify(bebidas));
    listar();
}
