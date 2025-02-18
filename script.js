//here are my apiKey and url
let apiKey = "Mm4I5t9EknjFoMCnUg6p1ok7OaYr9HxuzUOTX6KX";
url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2025-01-01`;
let response = [];
console.log(url);

function cardData(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList = `hidden card card${index}`;

    card.innerHTML = `
    <h2>${item.title}</h2>
        <img src="${item.hdurl}" alt="eventually there will be an image here" />
        <p class="description">${item.explanation}</p>
        <p class="date">${item.date}</p>
        <p class="photographer">${item.copyright}</p>
    `;
    container.appendChild(card);
  });
}

//write the API call
function apiCall() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      dataFromApi = data;
      console.log(dataFromApi);
      cardData(dataFromApi);
    })
    .catch((error) => console.error("Error:", error));
}

apiCall();

//working on revealing cards first.
let cardRevealButton = document.getElementById("cardRevealButton");
console.log(cardRevealButton);

function toggleVisibility() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.toggle("hidden"));

  const buttonText = cardRevealButton.textContent.trim();
  if (buttonText === "Click here to see the photo!") {
    cardRevealButton.textContent = "RESET";
  } else {
    cardRevealButton.textContent = "Click here to see the photo!";
  }
  console.log("Reveal function called");
}

//if it doesn't work, check to see if there's spaces in the text content being replaced
cardRevealButton.addEventListener("click", toggleVisibility);
/*removed dummy card code, pasted below: 
      <div class="hidden card card1">
        <h2>oh look a card header</h2>
        <img src="https://www.amazon.com/?tag=admarketus-20&ref=pd_sl_96f329803602185460b04ea3aa7b26a5394ef026678ab1764b783c46&mfadid=adm" alt="eventually there will be an image here" />
        <p class="description">description</p>
        <p class="date">date</p>
        <p class="photographer">photographer</p>
      </div>
      <div class="hidden card card2">
        <h2>oh look a card header</h2>
        <img src="https://www.amazon.com/?tag=admarketus-20&ref=pd_sl_96f329803602185460b04ea3aa7b26a5394ef026678ab1764b783c46&mfadid=adm" alt="eventually there will be an image here" />
        <p class="description">description</p>
        <p class="date">date</p>
        <p class="photographer">photographer</p>
      </div>*/
