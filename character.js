const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const characterBaseUrl = "https://rickandmortyapi.com/api/character/";

try {
  getDatas();
} catch (error) {
  console.log(error);
}

async function getDatas() {
  let response = await fetch(characterBaseUrl + id);
  let jsonData = response.json();
  jsonData.then((data) => setDatasToScreen(data));
}

function setDatasToScreen(charObj) {
  //! Set Image
  document.getElementById("charImg").src = charObj.image;
  //! Set Name
  document.getElementById("charName").innerText = getInfo(charObj.name);
  //! Set Info
  document.getElementById("gender").innerText = getInfo(charObj.gender);
  document.getElementById("status").innerText = getInfo(charObj.status);
  document.getElementById("species").innerText = getInfo(charObj.species);
  document.getElementById("type").innerText = getInfo(charObj.type);
  //! Set Origin
  document.getElementById("origin").innerText = getInfo(charObj.origin.name);
  setLocationData(charObj.origin.url, "originEl");
  //! Set Location
  document.getElementById("location").innerText = getInfo(
    charObj.location.name
  );
  setLocationData(charObj.location.url, "locationEl");
  //! Set Episodes
  setEpisodes(charObj.episode);
}

async function setLocationData(url, elId) {
  if (url.length !== 0) {
    let response = await fetch(url);
    let jsonData = response.json();
    jsonData.then((data) => {
      document.getElementById(elId).addEventListener("click", () => {
        window.location.href = `./location.html?id=${data.id}`;
      });
    });
  }
}

function setEpisodes(episodeUrls) {
  episodeUrls.forEach(async (url) => {
    let response = await fetch(url);
    let jsonData = response.json();
    jsonData.then((data) => {
      let episodeDiv = document.createElement("div");

      let infoDiv = document.createElement("div");
      infoDiv.className = "d-flex align-items-center justify-content-between";

      let subInfoDiv = document.createElement("div");
      //! Episode
      let episode = document.createElement("h5");
      episode.innerText = data.episode;
      subInfoDiv.append(episode);
      //! Episode Name
      let episodeName = document.createElement("p");
      episodeName.className = "text-secondary";
      episodeName.innerText = data.name;
      subInfoDiv.append(episodeName);
      //! Episode Air Date
      let airDate = document.createElement("p");
      airDate.className = "text-secondary";
      airDate.innerText = data.air_dat;
      subInfoDiv.append(airDate);

      infoDiv.append(subInfoDiv);

      //! Icon
      let icon = document.createElement("i");
      icon.className = "fa-solid fa-chevron-right";
      infoDiv.append(icon);

      episodeDiv.append(infoDiv);
      episodeDiv.append(document.createElement("hr"));

      episodeDiv.addEventListener("click", () => {
        window.location.href = `./episode.html?id=${data.id}`;
      });

      document.getElementById("episodes").append(episodeDiv);
    });
  });
}

function getInfo(data) {
  if (data.trim().length == 0) return "Unknown";
  return data;
}

// <div>
//   <div class="d-flex align-items-center justify-content-between">
//     <div>
//       <h5>S01E01</h5>
//       <p class="text-secondary">Pilot</p>
//       <p class="text-secondary">April 7, 2014</p>
//     </div>
//     <i class="fa-solid fa-chevron-right"></i>
//   </div>
//   <hr />
// </div>;
