let modoEdicao = false;
let idAtual = null;


function atualizar() {
    fetch("http://localhost:3000/materiais")
        .then(response => response.json())
        .then(json => {
            let html = "";
            for (let material of json) {
                html += `
                    <tr>
                    
                        <th scope='row' class='text-center'>${material.id}</th>
                        <th scope='row' class='text-center'>${material.nome}</th>
                        <td>${material.tipo}</td>
                        <td class='text-end'>R$ ${material.preco.toFixed(2)}</td>
                        <td>${material.peso} kg</td>
                        <td>${material.localidade}</td>
                        <td class='text-center'>
                            <button class='btn btn-sm btn-outline-primary me-1' id='editar-${material.id}'><i class='bi bi-pencil'></i></button>
                            <button class='btn btn-sm btn-outline-danger' id='excluir-${material.id}'><i class='bi bi-trash'></i></button>
                        </td>
                    </tr>
                `;
            }

            // Atualiza o HTML da tabela
            document.getElementById("livros_db").innerHTML = html;

            // Agora que os botões existem no DOM, adiciona os eventos
            for (let material of json) {
                // Botão Excluir
                document.getElementById(`excluir-${material.id}`).addEventListener("click", () => {
                    if (confirm("Tem certeza que deseja excluir este material?")) {
                        fetch(`http://localhost:3000/materiais/${material.id}`, {
                            method: "DELETE"
                        })
                        .then(() => atualizar())
                        .catch(error => console.error("Erro ao excluir:", error));
                    }
                });

                // Botão Editar
                document.getElementById(`editar-${material.id}`).addEventListener("click", () => {
                    document.getElementById("tipo").value = material.tipo;
                    document.getElementById("preco").value = material.preco;
                    document.getElementById("peso").value = material.peso;
                    document.getElementById("localidade").value = material.localidade || "";

                    modoEdicao = true;
                    idAtual = material.id;

                    const btn = document.getElementById("btnClicar");
                    btn.textContent = "Atualizar";
                    btn.classList.remove("btn-success");
                    btn.classList.add("btn-primary");
                });
            }
        })
        .catch(error => console.error('Erro ao buscar materiais:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    atualizar();

    const button = document.getElementById("btnClicar");
    if (button) {
        button.addEventListener("click", function () {
            const materiais = {
                nome: document.getElementById("nome").value,
                tipo: document.getElementById("tipo").value,
                preco: parseFloat(document.getElementById("preco").value),
                peso: parseFloat(document.getElementById("peso").value),
                localidade: document.getElementById("localidade").value
            };

            fetch("http://localhost:3000/materiais", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(materiais)
            })
            .then(response => {
                if (response.ok) {
                    atualizar();
                } else {
                    console.error('Erro ao salvar material');
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
        });
    }

    // Buscar dados da URL
    const parametros = new URLSearchParams(location.search);
    const id = parametros.get("id");

    if (id) {
        fetch(`http://localhost:3000/materiais/${id}`)
            .then(response => response.json())
            .then(material => {
                if (material) {
                    document.getElementById("nome").innerText = material.nome;
                    document.getElementById("tipo").innerText = material.tipo;
                    document.getElementById("preco").innerText = "R$ " + material.preco.toFixed(2);
                    document.getElementById("peso").innerText = material.peso + " kg";
                    document.getElementById("localidade").innerText = material.localidade;
                    document.getElementById("imagem").innerHTML = "<img src='assets/img/default.png' alt='Material'>";
                } else {
                    document.getElementById("tipo").innerText = "Não Existe";
                    document.getElementById("preco").innerText = "Não Existe";
                    document.getElementById("peso").innerText = "Não Existe";
                    document.getElementById("localidade").innerText = "Não Existe";
                }
            })
            .catch(error => console.error('Erro ao buscar material:', error));
    }
});
