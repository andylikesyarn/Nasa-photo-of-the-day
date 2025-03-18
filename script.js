let apiKey = "Mm4I5t9EknjFoMCnUg6p1ok7OaYr9HxuzUOTX6KX";
let date = "";
let quantity = "";
let apiUrl = "";
let myDat = "";
let resetButton = "";

// Create options for select element
const selectElement = document.getElementById("select-days");
for (let i = 1; i <= 200; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  selectElement.appendChild(option); //this is so much less annoying than how i made the options in the quiz api good lord
}

// Get variables from DOM
function getVariables() {
  quantity = document.getElementById("select-days").value;
}

//creating a date object n-1 days ago so correct number of photos return.
/*to do it i had to make a date object and then force it into the format needed by the api.
 */
const subtractDays = () => {
  let days = quantity - 1;
  const newDate = new Date(); //used catie's date formula to figure this part out
  newDate.setDate(newDate.getDate() - days);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1) //bc the month array starts w/ 0
    .padStart(2, "0"); //why does it require a capital String to turn to String? idk but it works! https://www.w3schools.com/jsref/jsref_string.asp
  //padStart sets req num of digits and adds an 0 to the beginning for first
  const day = String(newDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`; //same format as api url
  return formattedDate;
};

function apiUrlGenerator(event) {
  event.preventDefault();
  //gets my quantity var
  getVariables();
  //sets date to correct day to return specified num of photos
  date = subtractDays();
  apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}`;
  fetch(apiUrl) // make fetch happen
    .then((response) => response.json())
    .then((data) => {
      myDat = data;
      cardData(data);
      //console.log(myDat);
    })

    .catch((error) => console.error("Error:", error));
}

function cardData(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  if (data) {
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList = `card card${index}`; //used quizapi project code for this part then tweaked it to these cards.

      card.innerHTML = `
    <h2>${item.title}</h2>
    <p class="photographer">PHOTO BY: ${item.copyright}</p>
        <img src="${item.hdurl}" alt="image not loaded" />
        <p class="description">${item.explanation}</p>
        <p class="date">${item.date}</p>
        
    `;
      container.appendChild(card);
    });
  }
  /*in the original  version, you could just run the api call in the background and reveal whenever preferred, swapping the text on the button (how i originally did it)....however, because here we want the user to select the number first, we ALSO need 2 buttons. I want this part to run after the photos generate, so I put it in this part of the code...also was easier to call the api w one button and reset with the other, so a reveal button didn't really work. */
  resetButton = document.createElement("button");
  resetButton.id = "reset-button";
  resetButton.textContent = "Reset";
  container.appendChild(resetButton);
  resetButton.addEventListener(
    "click",
    resetFunction
  ); /*adding event listener here bc when i had it outside the function, it kept not generating bc resetButton hadn't been created yet whent he event listener was called thus didn't work. 
  used console log to see this was what was happening then removed it on fix
  */
}

/*this is basically doing what a toggle function would in the original version, clearing the html of the container*/
function resetFunction() {
  const container = document.getElementById("container");
  container.innerHTML = "";
}

document
  .getElementById("cardRevealButton")
  .addEventListener("click", (event) => {
    //i need the prevent default since the button runs an api call.
    event.preventDefault();
    apiUrlGenerator(event);
  });
