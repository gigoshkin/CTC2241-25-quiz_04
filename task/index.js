class StarWarsCharacterApp {
  constructor() {
    this.charactersTableBody = document.getElementById('charactersTableBody');
    this.searchInput = document.getElementById('searchInput');
    this.addCharacterForm = document.getElementById('addCharacterForm');
    this.characterNameInput = document.getElementById('characterName');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    
    this.characters = [];
    
    this.init();
  }

  init() {
    this.getCharacters();
    this.addEventListeners();
  }

  async getCharacters() {
    try {
      this.loadingIndicator.style.display = 'block';
      const response = await fetch('https://swapi.tech/api/people/');
      const data = await response.json();
      this.characters = data.results.map(character => ({
        ...character,
        isCustom: false,
      }));
      this.loadingIndicator.style.display = 'none';
      this.displayCharacters(this.characters);
    } catch (error) {
      this.loadingIndicator.textContent = 'Error fetching characters!';
      this.loadingIndicator.style.display = 'block';
      console.error('Error fetching characters:', error);
    }
  }

  displayCharacters(characters) {
    this.charactersTableBody.innerHTML = '';
    characters.forEach(character => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${character.name}</td>`;
      if (character.isCustom) {
        tr.classList.add('custom-character');
      }
      this.charactersTableBody.appendChild(tr);
    });
  }

  addEventListeners() {
    this.searchInput.addEventListener('input', (event) => this.handleSearch(event));
    this.addCharacterForm.addEventListener('submit', (event) => this.handleAddCharacter(event));
  }

  handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm)
    );
    this.displayCharacters(filteredCharacters);
  }

  handleAddCharacter(event) {
    event.preventDefault();
    const newCharacterName = this.characterNameInput.value.trim();
    
    if (newCharacterName) {
      const newCharacter = {
        name: newCharacterName,
        isCustom: true,
      };
      this.characters.push(newCharacter);
      this.displayCharacters(this.characters);
      this.characterNameInput.value = '';
    }
  }
}

const app = new StarWarsCharacterApp();
