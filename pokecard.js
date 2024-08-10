document.addEventListener("DOMContentLoaded", () => {
    const pokemonData = JSON.parse(localStorage.getItem('pokemonData'));
    

    if (!pokemonData) {
        document.getElementById('pokemon-info').innerHTML = '<p>No Pokemon data found</p>';
        return;
    }

    const pic = pokemonData.sprites.front_default
    const hp = pokemonData.stats[0].base_stat;
    const statAttack = pokemonData.stats[1].base_stat;
    const statDefense = pokemonData.stats[2].base_stat;
    const statSpeed = pokemonData.stats[5].base_stat;
    const baseExperience = pokemonData.base_experience;
    const abilities = pokemonData.abilities.map(a => `<li>${a.ability.name}</li>`).join("")

    document.getElementById('pokemon-info').innerHTML = 
    `
    <div class="pokemon-card">
        <div class="hp-value">
            HP ${hp}
        </div>
        <h2 class="text-capitalize">${pokemonData.name}</h2><br>
        <img src="${pic}" class="img-fluid-mb-3" alt="${pokemonData.name}"><br>
        <div class="abilities-container">
            <b> Abilities </b>
            <ul class="abilities-list">${abilities}</ul>
        </div>
        <div class="stats-row">
            <div>
                <h3>${statAttack}</h3>
                <p> Attack </p>
            </div>
            <div>
                <h3>${statDefense}</h3>
                <p> Defense </p>
            </div>
            <div>
                <h3>${statSpeed}</h3>
                <p> Speed </p>
            </div>
            <p class="base-experience"><b>Base Experience:</b>${baseExperience}</p>
        </div>
    </div>
    `;          
});