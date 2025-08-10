const locations = [
  { 
    name: "Table Mountain", 
    hint: "Famous landmark in Cape Town", 
    image: "images/Table-Mountain.jpg" 
  },
  { 
    name: "Kruger National Park", 
    hint: "Popular safari destination", 
    image: "images/Kruger.jpg"  
  },
  { 
    name: "Durban", 
    hint: "Coastal city in KwaZulu-Natal", 
    image: "images/Durban.jpg" 
  },
  { 
    name: "Johannesburg", 
    hint: "Largest city in South Africa", 
    image: "images/Johannesburg.jpg" 
  },
  { 
    name: "Robben Island", 
    hint: "Historic island near Cape Town", 
    image: "images/Robbe-Island.jpg" 
  },
  { 
    name: "Bloemfontein", 
    hint: "Judicial capital of South Africa", 
    image: "images/Bloemfonten.jpg"  
  }
];

let chosenLocation, displayWord, wrongGuesses;

function startGame() {
  try {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const locationData = locations[randomIndex];

    chosenLocation = locationData.name.toUpperCase();
    document.getElementById("hint").textContent = "Hint: " + locationData.hint;

    // Show image
    const imgElement = document.getElementById("locationImage");
    imgElement.src = locationData.image;
    imgElement.alt = locationData.name;

    displayWord = chosenLocation.replace(/[A-Z]/g, "_");
    wrongGuesses = 0;
    updateWord();
    renderLetters();
    document.getElementById("message").textContent = "";
  } catch (error) {
    console.error("Error starting game:", error);
    alert("Oops! Something went wrong starting the game.");
  }
}

function updateWord() {
  document.getElementById("word").textContent = displayWord.split("").join(" ");
}

function renderLetters() {
  const lettersDiv = document.getElementById("letters");
  lettersDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.onclick = () => guessLetter(btn.textContent);
    lettersDiv.appendChild(btn);
  }
}

function guessLetter(letter) {
  try {
    let found = false;
    let updatedWord = displayWord.split("");

    for (let i = 0; i < chosenLocation.length; i++) {
      if (chosenLocation[i] === letter) {
        updatedWord[i] = letter;
        found = true;
      }
    }

    displayWord = updatedWord.join("");
    updateWord();

    if (!found) {
      wrongGuesses++;
      if (wrongGuesses >= 6) {
        document.getElementById("message").textContent = "Game Over! The location was: " + chosenLocation;
        disableLetters();
      }
    } else if (displayWord === chosenLocation) {
      document.getElementById("message").textContent = "🎉 You Win!";
      disableLetters();
    }
  } catch (error) {
    console.error("Error guessing letter:", error);
    alert("Something went wrong with your guess.");
  }
}

function disableLetters() {
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = true);
}

// Start game when page loads
if (window.location.pathname.includes("game.html")) {
  window.onload = startGame;
}
