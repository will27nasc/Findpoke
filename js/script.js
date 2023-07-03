let pokemons = [];
let pokemonBoxes = document.querySelector('.pokemon-boxes');
let header = document.querySelector('header');
let i = 40;

function pegaPokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allpokemon => {

        allpokemon.results.map((val)=>{
            
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({nome:val.name,imagem:pokemonSingle.sprites.front_default});
                
                if(pokemons.length == quantidade){
                    
                    pokemonBoxes.innerHTML = "";

                    pokemons.map(function(val){
                    pokemonBoxes.innerHTML+=`
                    
                    <div class="pokemon-box card" style="width: 18rem;">
                        <img class="img-thumbnail card-img-top" src="`+val.imagem+`" alt="..." />
                        <div class="card-body">
                            <h3 class="card-title">`+val.nome+`</h3>
                            <a href="#" class="btn btn-primary">Saiba mais</a>
                        </div>
                    </div>         
                    `;
    
                    });
                };

            });

        });
    });

};

pegaPokemons(i);

function carregarPokemons() {
    i *= 2;
    return pegaPokemons(i);
}

function buscaPokemon() {
    var busca = document.querySelector('#busca').value
    for(let pokemon of pokemons) {
        if (pokemon.nome === busca) {
            return header.innerHTML =`
            <div class="informacoes">       
                <div class="pokemon-box card" style="width: 30rem;">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-outline-danger" onclick="apagar()"><i class="bi bi-x-square-fill"></i></button>
                    </div>
                    <img class="img-thumbnail card-img-top" src="`+pokemon.imagem+`" alt="..." />
                    <div class="card-body">
                        <h3 class="card-title">`+pokemon.nome+`</h3>
                        <a href="#" class="btn btn-primary">Saiba mais</a>
                    </div>
                </div>    
            </div>     
            `;
        };
    };

    for(let pokemon of pokemons) {
        if (pokemon.nome !== busca || busca === '') {
            return alert('Dados inválidos!');
        };
    };
}

function apagar() {
    header.innerHTML =`
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Findpoke <img src="./img/pokebola.png" alt="..." width="30px"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">

                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input id="busca" class="form-control me-2" type="search" placeholder="Busque pelo nome" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit" onclick="buscaPokemon()"><i class="bi bi-search"></i></button>
                </form>
            </div>
        </div>
    </nav> 
    `;
};












