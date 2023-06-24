let nextUrl = "https://rickandmortyapi.com/api/character?page=1";
let loadMoreButton = document.getElementById("loadMoreButton");
let characterArea = document.getElementById("charArea");

try {
  getDatas();
} catch (error) {
  console.log(error);
}

async function getDatas() {
  let response = await fetch(nextUrl);
  let jsonData = response.json();
  jsonData.then((data) => {
    nextUrl = data.info.next;
    if (!data.info.next) {
      loadMoreButton.style.display = "none";
    }
    data.results.forEach((char) => createCharCard(char));
  });
}

loadMoreButton.addEventListener("click", () => {
  try {
    getDatas();
  } catch (error) {
    console.log(error);
  }
});

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
  characterArea.appendChild(card);
}
1``;
