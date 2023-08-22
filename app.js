// Primero, definimos la clase Pokémon
class Pokemon {
    constructor(id, name, type, weight, abilities, ThumbnailImage, weakness) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.abilities = abilities;
        this.ThumbnailImage = ThumbnailImage;
        this.weakness = weakness;
    }
}
// Se asigna un color de acuerdo a cada tipo de pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F', 
};

// Luego, cargamos nuestros Pokémon desde el archivo JSON
let listaPokemon = [];
fetch('pokemones.json')
    .then(response => response.json())
    .then(data => {
        for (let pokemonData of data) {
            let pokemon = new Pokemon(pokemonData.id, pokemonData.name, pokemonData.type, pokemonData.weight, pokemonData.abilities, pokemonData.ThumbnailImage, pokemonData.weakness);
            listaPokemon.push(pokemon);
        }
        mostrarListaPokemon();
    });

// Función para mostrar nuestros Pokémon en tarjetas
function mostrarListaPokemon(filteredList = listaPokemon) {
    let container = document.getElementById('lista-pokemon');
    container.innerHTML = '';
    for (let pokemon of filteredList) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '25rem';

        // Aplicar el color de fondo según el tipo del Pokémon
        let typeColor = typeColors[pokemon.type[0]] || typeColors.default;
        card.style.backgroundColor = typeColor;

        //Llevar al HTML los datos del pokemon
        card.innerHTML = `
        <div class="custom-card">
        <img src="${pokemon.ThumbnailImage}" class="card-img-top" alt="Imagen de ${pokemon.name}">
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <h6 class="card-body">Tipo: ${pokemon.type.join(', ')}</h6>
            <br>
            <button type="button" class="btn btn-dark">
                Ver detalles
            </button>
        </div>
    </div>
    `;
    card.querySelector('button').addEventListener('click', () => mostrarDetallesPokemon(pokemon.id));
    container.appendChild(card);
}
}

// Función para mostrar los detalles de un Pokémon en un modal
function mostrarDetallesPokemon(id) {
    let pokemon = listaPokemon.find(p => p.id === id);
    let modal = document.getElementById('modal-pokemon');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${pokemon.name}</h5>
                </div>
                <div class="modal-body">
                    <p>Tipo: ${pokemon.type.join(', ')}</p>
                    <p>Peso: ${pokemon.weight} kg</p>
                    <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
                    <p>Debilidades: ${pokemon.weakness.join(', ')}</p>
                </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    `;

    // Bootstrap 5
    var myModal = new bootstrap.Modal(document.getElementById('modal-pokemon'), {});
    myModal.show();
}

// Función para buscar Pokémon por nombre
function buscarPokemon(name) {
    let filteredList = listaPokemon.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    mostrarListaPokemon(filteredList);
}   