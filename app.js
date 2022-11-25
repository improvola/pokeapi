
// let contenedor =  document.querySelector('.lista');

// fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
// .then(  respuesta => {
//     console.log('Se realizo el fetch');
//     return respuesta.json();
// })
// .then( respuestaJSON => {
//     console.log('Respuesta jSON');
//     console.log(respuestaJSON);
//     let json = respuestaJSON;
//     console.log(json.results);
//     console.log('probando');
//     renderizar(json.results);
// })
// .catch( error => {
//     console.log('Upss hay un error');
// })


// function renderizar(lista){
//     let html = '';

//     console.log(contenedor)
//     lista.forEach(item => {
//         console.log(item)
//         html += `   
//                     <div class="card" style="width: 18rem;">
//                     <h3 class="card-title">${item.name}</h4>
//                     <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Pok%C3%A9ball.png" alt="" class="card-img-top" style="max-width:150px;">
                    
//                     <a href="detalles.html" class="button-56">Ver mas</a>
//                 </div>`
//     });

//     contenedor.innerHTML = html;

// }
let sound = new Audio("./src/sound/mainTheme.mp3") ;
let pokemonContainer =  document.querySelector('.lista');

//MUSICA 
playBtn.addEventListener('click',()=>{
    sound.play();
})
pauseBtn.addEventListener('click', ()=>{
    sound.pause();
})


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response)).catch(err => alert('error'))
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokemonContainer.textContent = cardPokemon(pokemon);
}

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        cardPokemon(data);
    })
}

function fetchPokemons(number) {
    for (let i = 1; i <= number; i++){
        fetchPokemon(i);
    }
}

function cardPokemon(pokemon){
    let card = document.createElement('div');
    card.classList.add('card');

    let spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-cointainer');

    let sprite = document.createElement('img');
    sprite.src = pokemon.sprites.other.dream_world.front_default

    spriteContainer.appendChild(sprite);

    let number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString()}`;
    
    let button = document.createElement('div');
    button.classList.add('button-56');
    button.textContent = "Mas";
    button.id = pokemon.id;
    button.addEventListener("click", recargar);


    let name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(button);

    pokemonContainer.appendChild(card);
    
}

fetchPokemons(101);

function recargar(evento){
    console.log(evento.target);
    let id = evento.target.id;
    console.log(id);
    window.location.assign(`detalles.html?id=${id}`);
    //fetchPokemon();
}

