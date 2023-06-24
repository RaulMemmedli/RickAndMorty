let nextUrl = "https://rickandmortyapi.com/api/episode?page=1";
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
    data.results.forEach((episode) => createEpisodeCard(episode));
  });
}

loadMoreButton.addEventListener("click", () => {
  try {
    getDatas();
  } catch (error) {
    console.log(error);
  }
});

function createEpisodeCard(episodeObj) {
  console.log(episodeObj);
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
  let nameOfepisode = document.createElement("h5");
  nameOfepisode.className = "card-title text-center";
  nameOfepisode.innerText = episodeObj.name;
  cardBody.append(nameOfepisode);
  //! Create Char Specie
  let airDate = document.createElement("p");
  airDate.className = "card-text text-secondary";
  airDate.innerText = episodeObj.air_date;
  cardBody.append(airDate);
  //! Create Char Specie
  let episode = document.createElement("p");
  episode.className = "card-text text-dark";
  episode.innerText = episodeObj.episode;
  cardBody.append(episode);

  card.addEventListener("click", () => {
    window.location.href = `./episode.html?id=${episodeObj.id}`;
  });

  //! Final Step
  area.appendChild(card);
}
