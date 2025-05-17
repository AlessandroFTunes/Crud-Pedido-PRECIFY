    function Main() {
      const button = document.getElementById("button");
      button.addEventListener("click", function() {
        // lê o valor selecionado
        var material = document.getElementById("material").value;

        console.log("Material selecionado:", material);
        // se quiser usar como número:
        var matNum = parseInt(material, 10);
        console.log("Como número:", matNum);
      });
    }


/*     <option value="0">Escolha seu material</option>
    <option value="1">Plastico</option>
    <option value="2">Metal</option>
    <option value="3">Papel</option>
    <option value="3">Vidro</option>
    <option value="3">Material Organico</option> */