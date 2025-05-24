// colocar e atualizar a pagina
function atualizar() {
    fetch("http://localhost:3000/materiais")
        .then(response => response.json())
        .then(json => {
            let html = "";
            for (let material of json) {
                html += "<tr>";
                html += "<th scope='row' class='text-center' id='id-" + material.id + "'>" + material.id + "</th>";
                html += "<td id='tipo-" + material.id + "'>" + material.tipo + "</td>";
                html += "<td id='preco-" + material.id + "'>R$ " + material.preco.toFixed(2) + "</td>";
                html += "<td id='peso-" + material.id + "'>" + material.peso + " kg</td>";
                html += "<td id='localidade-" + material.id + "'>" + material.localidade + "</td>";
                html += "<td class='text-center'>";
                html += "<button class='btn btn-sm btn-outline-primary me-1' id='editar-" + material.id + "'><i class='bi bi-pencil'></i></button>";
                html += "<button class='btn btn-sm btn-outline-danger' id='excluir-" + material.id + "'><i class='bi bi-trash'></i></button>";
                html += "</td>";
                html += "</tr>";
            }
            document.getElementById("livros_db").innerHTML = html;
        })
        .catch(error => console.error('Erro ao buscar materiais:', error));
}


document.addEventListener("DOMContentLoaded", function () {
    atualizar();

    const button = document.getElementById("btnClicar");
    button.addEventListener("click", function () {
        let materiais = {
            "id": document.getElementById("id").value,
            "tipo": document.getElementById("tipo").value,
            "preco": parseFloat(document.getElementById("preco").value),
            "peso": parseFloat(document.getElementById("peso").value),
            "localidade": document.getElementById("localidade").value
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
                atualizar(); // Atualiza a lista após salvar
            } else {
                console.error('Erro ao salvar material');
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    });
});


// Pegar os elementos da URL
var parametros = new URLSearchParams(location.search);
var id = parametros.get("id");

if (id) {
    fetch("http://localhost:3000/materiais/" + id, {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then(response => response.json())
    .then(material => {
        if (material) {
            document.getElementById("tipo").innerHTML = material.tipo;
            document.getElementById("preco").innerHTML = "R$ " + material.preco.toFixed(2);
            document.getElementById("peso").innerHTML = material.peso + " kg";
            document.getElementById("localidade").innerHTML = material.localidade;
            document.getElementById("imagem").innerHTML = "<img src='assets/img/default.png'>";
        } else {
            document.getElementById("tipo").innerHTML = "Não Existe";
            document.getElementById("preco").innerHTML = "Não Existe";
            document.getElementById("peso").innerHTML = "Não Existe";
            document.getElementById("localidade").innerHTML = "Não Existe";
        }
    })
    .catch(error => console.error('Erro ao buscar material:', error));
}

