let categorias = JSON.parse(localStorage.getItem("categorias"));

if (categorias === null) {
    categorias = [];
    carregarInicial();
}

function listar() {
    let linhas = "";

    for (let i = 0; i < categorias.length; i++) {
        const cat = categorias[i];
        linhas += `<tr>
        <td>${cat.id}</td>
        <td>${cat.nome}</td>
        <td>${cat.descricao}</td>
        <td>${cat.temperatura}</td>
        <td><a href="#" class="link" onclick="editar(${cat.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${cat.id})">Excluir</a></td>
        </tr>`;
    }
    document.getElementById("tabela").innerHTML = linhas;
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
    salvar();
}

function editar(id) {
    const cat = categorias.find(c => c.id === id);

    cat.nome = prompt("Novo nome:", cat.nome);
    cat.descricao = prompt("Nova descrição:", cat.descricao);
    cat.temperatura = prompt("Nova temperatura:", cat.temperatura);

    salvar();
}

function remover(id) {
    categorias = categorias.filter(c => c.id !== id);
    salvar();
}

function salvar() {
    localStorage.setItem("categorias", JSON.stringify(categorias));
    listar();
}
