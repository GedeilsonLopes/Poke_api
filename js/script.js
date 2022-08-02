const pokemonName = document.querySelector(".pokemon_name");
const pokemonId = document.querySelector(".pokemon_id");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input_search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonId.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        searchPokemon = data["id"];

        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data["name"];
        pokemonId.innerHTML = data["id"] + " - ";
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];
        inputSearch.value = "";
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found";
        pokemonId.innerHTML = "";
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        renderPokemon(searchPokemon - 1);
    }
});

buttonNext.addEventListener("click", () => {
    if (searchPokemon <= 648) {
        renderPokemon(searchPokemon + 1);
    }
});

renderPokemon(searchPokemon);
