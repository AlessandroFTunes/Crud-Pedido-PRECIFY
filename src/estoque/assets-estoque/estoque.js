// colocar e atualizar a pagina
function atualizar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            var qnd = json.length;

            var html = "";
            for (let x = 0; x < qnd; x++) {
                html += "<li class='list-group-item'>" +
                        "<a href='detalhes.html?id=" + json[x].id + "'>" +
                        json[x].id + " - " + json[x].titulo +
                        "</a></li>";
            }

            document.getElementById("livros_db").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:3000/livros", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", function () {
    atualizar();

    const button = document.getElementById("btnGravar");
    button.addEventListener("click", function () {
        let livros = {
            "id": document.getElementById("id").value,
            "titulo": document.getElementById("titulo").value,
            "autor": document.getElementById("autor").value,
            "ano": document.getElementById("ano").value
        };

        var xhttpPost = new XMLHttpRequest();
        xhttpPost.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                atualizar(); // Atualiza a lista após salvar
            }
        };
        xhttpPost.open("POST", "http://localhost:3000/livros", true);
        xhttpPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttpPost.send(JSON.stringify(livros));
    });
});

// pegar os elementos
var parametros = new URLSearchParams(location.search);
var id = parametros.get("id");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var livro = JSON.parse(xhttp.responseText);

        if (livro) {
            document.getElementById("titulo").innerHTML = livro.titulo;
            document.getElementById("autor").innerHTML = livro.autor;
            document.getElementById("ano").innerHTML = livro.ano;
            document.getElementById("imagem").innerHTML = "<img src='assets/img/default.png'>";
        } else {
            document.getElementById("titulo").innerHTML = "Não Existe";
            document.getElementById("autor").innerHTML = "Não Existe";
            document.getElementById("ano").innerHTML = "Não Existe";
        }
    }
};
xhttp.open("GET", "http://localhost:3000/livros/" + id, true);
xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhttp.send();