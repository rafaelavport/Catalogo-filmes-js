let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let btnDetalhes = document.querySelector("#btn-detalhes");
let btnSalvar = document.querySelector("#btn-salvar");
let btn

btnBuscarFilme.onclick = () => {
    if(inputBuscarFilme.ariaValueMax.length > 0){
        console.log(inputBuscarFilme.value);
    }
    return false;
}

btnBuscarFilme.onclick = () =>{
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?i=tt3896198&apikey=21ad4a64&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp)=>resp.json())
        .then((resp)=>{
            resp.Search.forEach((item)=>{
                console.log(item);
                let filme=new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    null,
                    null,
                    item.Poster,
                    null,
                    null,
                    null,
                    null,
                    null
                );
                filmes.push(filme);
            });
            listarFilmes(filmes)
        })
    }
    return false;
 }



let listarFilmes = async (filmes)=>{
    let listaFilmes = document.querySelector("#lista-filmes");
    listaFilmes.style.display="flex";
    listaFilmes.innerHTML = "";
    document.querySelector("#mostrar-filme").innerHTML="";
    document.querySelector("#mostrar-filme").style.display="none";
    //console.log(listaFilmes);
    if (filmes.length > 0){
        filmes.forEach(async(filme)=>{
            console.log(filme);
            listaFilmes.appendChild( filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
            }
        });
    }
}
            
let detalhesFilme =  (id)=>{
    fetch("https://www.omdbapi.com/?apikey=956c739e&i="+id)
    .then ((resp)=> resp.json())
    .then ((resp)=>{
        console.log (resp); 
        let filme=new Filme
        ( resp.imdbID, 
            resp.Title, 
            resp.Year, 
            resp.Genre.split(","), 
            resp.Runtime, 
            resp.Poster, 
            resp.Plot, 
            resp.Director, 
            resp.Actors.split(","), 
            resp.Awards, 
            resp.imdbRating, 
            ) 

            console.log(filme)
            document.querySelector ("#mostrar-filme").appendChild(filme.getDetalhesFilmes());

            document.querySelector("#btnFechar").onclick = () => {
                document.querySelector("#mostrar-filme").style.display="none";
                document.querySelector("#mostrar-filme").innerHTML="";
                document.querySelector("#lista-filmes").style.display="flex";
            };

            document.querySelector("#btnSalvar").onclick = () => {
                salvarFilme(filme);
            };
            
            document.querySelector("#lista-filmes").style.display="none";
            document.querySelector("#mostrar-filme").style.display="block";
    })}; 