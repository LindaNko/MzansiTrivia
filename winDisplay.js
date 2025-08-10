


    // Displays winning city details on win.html
function displayWinningCityDetails() {
  const cities = {
    "Cape Town": {
      description: "Cape Town is a stunning coastal city known for Table Mountain and its beautiful beaches.",
      map: "https://goo.gl/maps/3Q4sD6Y6i6H2",
      spots: ["Table Mountain", "V&A Waterfront"]
    },
    "Durban": {
      description: "Durban is famous for its golden beaches, warm Indian Ocean, and vibrant cultural mix.",
      map: "https://goo.gl/maps/6Vv1Rt2Zr1k",
      spots: ["uShaka Marine World", "Golden Mile Beach"]
    },
    "Johannesburg": {
      description: "Johannesburg, the City of Gold, is South Africa's largest city and economic hub.",
      map: "https://goo.gl/maps/xXYywhhD5R32",
      spots: ["Apartheid Museum", "Gold Reef City"]
    }
  };

  // Get city name from URL parameters
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");

  // Find elements in DOM
  const cityNameElem = document.getElementById("cityName");
  const cityDescElem = document.getElementById("cityDescription");
  const mapLinkElem = document.getElementById("mapLink");
  const spotsListElem = document.getElementById("topSpots");

  // Populate details if city exists
  if (city && cities[city]) {
    cityNameElem.textContent = city;
    cityDescElem.textContent = cities[city].description;
    mapLinkElem.href = cities[city].map;

    // Clear previous list items just in case
    spotsListElem.innerHTML = "";

    // Add list items
    cities[city].spots.forEach(spot => {
      const li = document.createElement("li");
      li.textContent = spot;
      spotsListElem.appendChild(li);
    });
  } else {
    // Fallback message if city not found
    document.querySelector(".win-container").innerHTML =
      "<p>City information not found.</p>";
  }
}

// Run when page loads
window.addEventListener("DOMContentLoaded", displayWinningCityDetails);
