const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let area = document.getElementById("area");

const locationBaseUrl = "https://rickandmortyapi.com/api/location/";

try {
  getDatas();
} catch (error) {
  console.log(error);
}

async function getDatas() {
  let response = await fetch(locationBaseUrl + id);
  let jsonData = response.json();
  jsonData.then((data) => setDatasToScreen(data));
}

function getInfo(data) {
  if (data.trim().length == 0) return "Unknown";
  return data;
}

function setDatasToScreen(locationObj) {
  console.log(locationObj);
  //! Set Name
  document.getElementById("locationName").innerText = getInfo(locationObj.name);
  document.title = getInfo(locationObj.name);
  //! Set Info
  document.getElementById("type").innerText = getInfo(locationObj.type);
  document.getElementById("dimension").innerText = getInfo(
    locationObj.dimension
  );
  locationObj.residents.forEach((residentUrl) => getResident(residentUrl));
}

async function getResident(url) {
  let response = await fetch(url);
  let jsonData = response.json();
  jsonData.then((data) => createCharCard(data));
}

function createCharCard(charObj) {
  console.log(charObj);
  //! Create Card
  let card = document.createElement("div");
  card.className = "card shadow p-0";
  card.style.width = "15rem";
  //! Create Card Img
  let img = document.createElement("img");
  img.src = charObj.image;
  img.className = "card-img-top";
  img.alt = charObj.name;
  card.append(img);
  //! Create Card body
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);
  //! Create Char Name
  let nameOfChar = document.createElement("h5");
  nameOfChar.className = "card-title";
  nameOfChar.innerText = charObj.name;
  cardBody.append(nameOfChar);
  //! Create Char Specie
  let specieOfChar = document.createElement("p");
  specieOfChar.className = "card-text text-secondary";
  specieOfChar.innerText = charObj.species;
  cardBody.append(specieOfChar);

  card.addEventListener("click", () => {
    window.location.href = `./character.html?id=${charObj.id}`;
  });

  //! Final Step
  area.appendChild(card);
}
