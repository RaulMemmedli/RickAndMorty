let nextUrl = "https://rickandmortyapi.com/api/location?page=1";
let loadMoreButton = document.getElementById("loadMoreButton");
let area = document.getElementById("area");

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
    data.results.forEach((location) => createLocationCard(location));
  });
}

loadMoreButton.addEventListener("click", () => {
  try {
    getDatas();
  } catch (error) {
    console.log(error);
  }
});

function createLocationCard(locationObj) {
  console.log(locationObj);
  //! Create Card
  let card = document.createElement("div");
  card.className = "card shadow p-0";
  card.style.width = "15rem";
  //! Create Card body
  let cardBody = document.createElement("div");
  cardBody.className =
    "card-body px-5 d-flex align-items-center justify-content-center flex-column";
  card.append(cardBody);
  //! Create Char Name
  let nameOfLocation = document.createElement("h5");
  nameOfLocation.className = "card-title text-center";
  nameOfLocation.innerText = locationObj.name;
  cardBody.append(nameOfLocation);
  //! Create Char Specie
  let typeOfLocation = document.createElement("p");
  typeOfLocation.className = "card-text text-secondary";
  typeOfLocation.innerText = locationObj.type;
  cardBody.append(typeOfLocation);

  card.addEventListener("click", () => {
    window.location.href = `./location.html?id=${locationObj.id}`;
  });

  //! Final Step
  area.appendChild(card);
}
