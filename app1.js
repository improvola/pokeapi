
let pokemonContainer =  document.querySelector('.detalles');
const urlTypePokemons = "https://pokeapi.co/api/v2/type/";

let sound = new Audio("./src/sound/pokemon-battle.mp3") ;

//MUSICA 
playBtn.addEventListener('click',()=>{
    sound.play();
})
pauseBtn.addEventListener('click', ()=>{
    sound.pause();
})


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
    card.classList.add('card1');

    let spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-cointainer');

    let sprite = document.createElement('img');
    sprite.src = pokemon.sprites.other.dream_world.front_default

    spriteContainer.appendChild(sprite);

    let number = document.createElement('p');
    number.textContent = `ID: #${pokemon.id.toString()}`;

    let base = document.createElement('p');
    base.textContent = `Base Exp: ${pokemon.base_experience}`;

    let peso = document.createElement('p');
    peso.textContent = `Peso: ${pokemon.weight} kg`;

    let tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${pokemon.types[0].type.name}`;
    
    let atac = document.createElement('p');
    atac.textContent = `Ataque: ${pokemon.moves[0].move.name}`;

    let button = document.createElement('div');
    button.classList.add('button-56');
    button.textContent = "Volver";
    button.href = `#${pokemon.id}`;
    button.addEventListener("click", recargar);


    let name = document.createElement('p');
    name.classList.add('name');
    name.textContent = `Pokemon: ${pokemon.name}`

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(tipo);
    card.appendChild(base);
    card.appendChild(peso);
    card.appendChild(atac);
    
    card.appendChild(button);
    

    pokemonContainer.appendChild(card);
    
}
fetchPokemons(1);


function recargar(){
    window.location.assign('index.html');
    fetchPokemons(`${id}`);
}
