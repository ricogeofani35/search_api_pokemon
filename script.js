
try {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
    .then(response => response.json())
    .then(response => {
        let pokemons = response.results;
        let pokemonContainer = document.getElementById('pokemon-container');
        let pokemonResult = '';

        pokemons.forEach( pokemon => {
            pokemonResult += showUiPokemon(pokemon);
            pokemonContainer.innerHTML = pokemonResult;
        });
    });
} catch (err) {
    console.log(err);
}

function showUiPokemon(pokemon) {
    return ` <div class='col-md-4'>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-12">
                            <div class="card-body">
                            <h5 class="card-title">${pokemon.name}</h5>
                            <a href='#' class="btn btn-warning detail-pokemon" data-url='${pokemon.url}' >detail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}


document.addEventListener('click', function(e) {
    if(e.target.classList.contains('detail-pokemon')) {

        let urlDetail = e.target.dataset.url;

        try {
          
                getDataDetail(urlDetail);        
                  
        } catch(err) {
            console.log(err);
        }
    }

    if(e.target.classList.contains('back')) {
        document.location.reload();
    }

});

function getDataDetail(urlDetail) {
    fetch(urlDetail)
    .then(response => response.json())
    .then(response => {
        let content = document.querySelector('.content');
        content.innerHTML =  showUiDetail(response);
        const detail =  document.querySelector('.detail');
        detail.addEventListener('click', function() {

             let detailContainer = document.querySelector('.detail-container');

             detailContainer.innerHTML = `<div class='col-md-6'>
                                             <p>Height : ${response.height}</p>
                                             <p>weight: ${response.weight}</p>
                                         </div>
                                     `;
        });
    });
}

function showUiDetail(response) {
    return `<button class='btn btn-outline-secondary mt-5 back'>Back</button>
                <section class="mt-2 bordered shadow py-5 px-5 rounded text-light bg-dark" style='margin: 0 150px;position: relative;'>
                    <div class="header d-flex justify-content-between align-items-end">
                        <div class='left'>
                            <h1>${response.species.name}</h1>
                            <div class="abilities d-flex gap-4 mt-2">
                                <button class='btn btn-outline-primary btn-sm'>${response.abilities[0].ability.name}</button>
                                <button class='btn btn-outline-warning btn-sm'>${response.abilities[1].ability.name}</button>
                            </div>
                        </div>
                        <di class='right'>
                            <h2>#000${response.id}</h2>
                            <button class='btn btn-outline-info btn-sm detail' data-bs-toggle="modal" data-bs-target="#exampleModal">detail</button>
                        </div>
                    
                    </div>
                    <div class="body">
                        <div class='d-flex justify-content-center'>
                            <img src="${response.sprites.other.home.front_default}" style='position: relative; z-index: 9999;'>
                        </div>
                        <div class='detail bg-light text-dark d-flex align-items-center flex-column justify-content-center' style='position: absolute; left: 0; right: 0; top: 70%;bottom: 0; border-radius: 40px 40px 0 0'></div>
                    </div>

            </section>`;
}

