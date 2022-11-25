
//MUSICA 
let sound = new Audio("./src/sound/mainTheme.mp3") ;

let pokemonContainer =  document.querySelector('.lista');
let historialContainer = document.querySelector('.historial');

playBtn.addEventListener('click',()=>{
    sound.play();
})
pauseBtn.addEventListener('click', ()=>{
    sound.pause();
})


//HISTORIAL

function solicitarPokemon(){
    pokemon =  cardHistorial();
    guardarPokemon();
    mostrarPokemon();
}


function guardarPokemon(){
    console.log('Guardando dato de Pokemon');
    localStorage.setItem('dato', pokemon);
}

function leerPokemon(){
    console.log('leer nombre del pokemon');
    pokemon = localStorage.getItem('dato');
    console.log(pokemon);
    mostrarPokemon();
}


function mostrarPokemon(){
    titulo.textContent = `Pokemon buscado: ${pokemon}`;
    fetchPokemons(id);
    cardHistorial();
}

function cardHistorial(){
    let buttonH = document.createElement('div');
    buttonH.classList.add('button-57');
    buttonH.textContent = "HISTORIAL";
    buttonH.id = pokemon.id;
    buttonH.addEventListener("click", recargar);

    card.appendChild(buttonH);
    historialContainer.appendChild(buttonH);

}

//BUSCADOR
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

//FETCH
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        cardPokemon(data);
    })
}

//INCREMENTADOR
function fetchPokemons(number) {
    for (let i = 1; i <= number; i++){
        fetchPokemon(i);
    }
}

//CARDS
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

    his.appendChild(card);
    
}
//IMPRIMIR
fetchPokemons(101);

//RECARGAR A DETALLES
function recargar(evento){
    console.log(evento.target);
    let id = evento.target.id;
    console.log(id);
    window.location.assign(`detalles.html?id=${id}`);
    //fetchPokemon();
}

//RECARGAR HISTORIAL
function recargarH(){
    console.log('pagina recargada');
    window.location.assign(`historial.html`);
}

