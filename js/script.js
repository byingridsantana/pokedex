// Seleciona os elementos do HTML que exibem nome, número e imagem do Pokémon
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

// Seleciona os elementos do formulário e botões de navegação
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Define o Pokémon inicial a ser exibido (ID 26 - Raichu)
let searchPokemon = 26;

// Função assíncrona para buscar dados de um Pokémon na PokéAPI
const fetchPokemon = async (pokemon) => {
  // Faz a requisição à API com base no nome ou número do Pokémon
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  // Se a resposta for bem-sucedida (status 200), retorna os dados em formato JSON
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Função para renderizar as informações do Pokémon na tela
const renderPokemon = async (pokemon) => {
  // Mostra a mensagem "Loading..." enquanto os dados estão sendo buscados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Chama a função de busca e aguarda o retorno dos dados
  const data = await fetchPokemon(pokemon);

  // Se os dados foram encontrados
  if (data) {
    // Exibe a imagem do Pokémon
    pokemonImage.style.display = 'block';
    // Exibe o nome e o número do Pokémon
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    // Define a imagem animada da geração V
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    // Limpa o campo de busca
    input.value = '';
    // Atualiza o ID do Pokémon atual
    searchPokemon = data.id;
  } else {
    // Caso o Pokémon não seja encontrado, oculta a imagem e mostra mensagem de erro
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Evento para quando o formulário for enviado (pressionar Enter ou clicar no botão de busca)
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento da página
  renderPokemon(input.value.toLowerCase()); // Busca o Pokémon com o nome digitado (em letras minúsculas)
});

// Evento de clique no botão "Anterior"
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Garante que o ID não fique abaixo de 1
    searchPokemon -= 1; // Decrementa o ID
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Evento de clique no botão "Próximo"
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

// Renderiza o Pokémon inicial assim que o script é carregado
renderPokemon(searchPokemon);
