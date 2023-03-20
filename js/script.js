let ator = new Ator(1, "John Wayne");
console.log(ator);

let diretor = new Diretor(1, "Alfred Hitchcock");
console.log(diretor);

let direcao =[
    new Diretor(1, "Lana Wachowski"),
    new Diretor(2, "Lilly Wachowski")
];

let elenco =[
    new Ator(1, "Keanu Reeves"),
    new Ator(2, "Carrie-Anne Moss"),
    new Ator(3, "Laurence Fishburne"),
    new Ator(4, "Joe Pantoliano"),
    new Ator(5, "Hugo Weaving"),
    new Ator(6, "Antony Ray Parker")
];

let genero = ["Ação","Aventura","Ficção cientifica"];


let sinopse = "Um artista pobre e uma jovem rica se conhecem e se apaixonam na fatídica jornada do Titanic, em 1912. Embora esteja noiva do arrogante herdeiro de uma siderúrgica, a jovem desafia sua família e amigos em busca do verdadeiro amor.";

let cartaz = "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"

let filme = new Filme(
    1,
    "Matrix",
    1999,
    genero,
    102,
    sinopse,
    cartaz,
    direcao,
    elenco,
    14,
    null
);
console.log(filme);

let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

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
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    console.log(listaFilmes);
    if (filmes.length > 0){
        filmes.forEach(async(filme)=>{
            console.log(filme);
            listaFilmes.appendChild( filme. getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
            }
        });
    }
}
getBtnDetalhes=()=>{
    return this.btnDetalhes;
}
let detalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=21ad4a64&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        console.log(resp)
    });
    
}