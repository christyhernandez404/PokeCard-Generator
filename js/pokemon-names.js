const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

async function fetchAllPokemonNames() {
  let allPokemonNames = [];
  let nextUrl = apiUrl;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }

      const data = await response.json();
      const pokemonNames = data.results.map(pokemon => pokemon.name);
      allPokemonNames = allPokemonNames.concat(pokemonNames);
      nextUrl = data.next;
    }

    allPokemonNames.sort((a, b) => a.localeCompare(b));

    displayPokemonNames(allPokemonNames);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

function displayPokemonNames(names) {
  const accordionContainer = document.getElementById("pokemon-accordion");

  // Group names by their starting letter
  const groupedNames = names.reduce((acc, name) => {
    const firstLetter = name[0].toUpperCase(); // Get the first letter and capitalize it
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(name);
    return acc;
  }, {});

  // Create accordion items for each letter
  Object.keys(groupedNames).sort().forEach((letter, index) => {
    const accordionItem = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${letter}">
          <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${letter}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse-${letter}">
            ${letter}
          </button>
        </h2>
        <div id="collapse-${letter}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading-${letter}" data-bs-parent="#pokemon-accordion">
          <div class="accordion-body">
            <ul class="list-group">
              ${groupedNames[letter].map(name => `<li class="list-group-item">${name}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    accordionContainer.insertAdjacentHTML("beforeend", accordionItem);
  });
}

fetchAllPokemonNames();