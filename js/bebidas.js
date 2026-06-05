let bebidas = JSON.parse(localStorage.getItem("bebidas"));

if (bebidas === null) {
    bebidas = [];
    carregarInicial();
}

function listar() {
    let linhas = "";

    for (let i = 0; i < bebidas.length; i++) {
        const beb = bebidas[i];
        linhas += `<tr>
        <td>${beb.id}</td>
        <td>${beb.nome}</td>
        <td>${beb.categoria}</td>
        <td>${beb.volume}</td>
        <td>R$ ${parseFloat(beb.preco).toFixed(2)}</td>
        <td><a href="#" class="link" onclick="editar(${beb.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${beb.id})">Excluir</a></td>
        </tr>`;
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function carregarInicial() {
    const inicial = [
        { nome: "Heineken", categoria: "Cerveja", volume: "350ml", preco: "6.50" },
        { nome: "Skol", categoria: "Cerveja", volume: "350ml", preco: "4.00" },
        { nome: "Coca-Cola", categoria: "Refrigerante", volume: "350ml", preco: "5.00" },
        { nome: "Smirnoff Ice", categoria: "Ice", volume: "275ml", preco: "8.00" },
        { nome: "Devassa", categoria: "Cerveja", volume: "350ml", preco: "5.50" },
        { nome: "Red Bull", categoria: "Energético", volume: "250ml", preco: "12.00" },
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

    const nova = { id: Date.now(), nome, categoria, volume, preco };
    bebidas.push(nova);
    salvar();
}

function editar(id) {
    const beb = bebidas.find(b => b.id === id);

    beb.nome = prompt("Novo nome:", beb.nome);
    beb.categoria = prompt("Nova categoria:", beb.categoria);
    beb.volume = prompt("Novo volume:", beb.volume);
    beb.preco = prompt("Novo preço:", beb.preco);

    salvar();
}

function remover(id) {
    bebidas = bebidas.filter(b => b.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("bebidas", JSON.stringify(bebidas));
    listar();
}
