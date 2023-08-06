document.addEventListener("DOMContentLoaded", () => {
  //fetchData
  fetchData();

  //Create searchBox and searchButton to use
  const searchBox = document.querySelector("#search-box");
  const searchButton = document.querySelector("#search-form button");

  //Create event listener for when the user clicks search
  searchButton.addEventListener("click", (click) => {
    click.preventDefault();
    const wordInput = searchBox.value.normalize("NFC").toLowerCase();
    birdsFilter(wordInput);
  });

  //Create statusSelect
  const statusSelect = document.querySelector("#status-select");

  //Create event listener for when the user selects a staus
  statusSelect.addEventListener("change", () => {
    const select = statusSelect.value;
    filterStatus(select);
  });
  const popOut = document.getElementById("birdPopOut");
  const closeButton = document.querySelector(".close");

  closeButton.addEventListener("click", function () {
    popOut.style.display = "none";
  });
});

async function fetchData() {
  const response = await fetch("./data/nzbird.json");
  if (!response.ok) {
    console.error(response.status); // error handling
  }
  const data = await response.json(); // parse to JSON and await it
  console.log(data); // use the data
  birdsShow(data);
}

//function to show all of the birds
function birdsShow(birds) {
  //Create birdList const
  const birdList = document.querySelector("#bird-list");

  birds.forEach((bird) => {
    //Create a new bird card
    const birdCard = document.createElement("article");
    birdCard.classList.add("bird-card");

    birdCard.dataset.bird = JSON.stringify(bird);

    //Get the data for the bird card and add it
    //birdImg add to card
    const birdImg = document.createElement("img");
    birdImg.src = bird.photo.source;
    birdImg.alt = bird.primary_name;

    //birdName add to card
    const birdName = document.createElement("h2");
    birdName.textContent = `${bird.english_name} (${bird.primary_name})`;

    //birdStatus add to card
    const birdStatus = document.createElement("p");
    birdStatus.textContent = bird.status;

    //birdStatusColor add to card
    const birdStatusColor = document.createElement("div");
    birdStatusColor.classList.add("status-color");
    birdStatusColor.classList.add(
      bird.status.toLowerCase().replace(/\s+/g, "-")
    );

    //birdPhotographer add to card
    const birdPhotographer = document.createElement("p");
    birdPhotographer.textContent = `Photo by ${bird.photo.credit}`;

    //Append all of the elements to the card
    birdCard.appendChild(birdImg);
    birdCard.appendChild(birdName);
    birdCard.appendChild(birdStatus);
    birdCard.appendChild(birdStatusColor);
    birdCard.appendChild(birdPhotographer);

    //Append card to the website
    birdList.appendChild(birdCard);

    // Attach click event to the newly created birdCard
    document
      .getElementById("bird-list")
      .addEventListener("click", function (event) {
        if (event.target.closest(".bird-card")) {
          const birdCard = event.target.closest(".bird-card");

          // Retrieve the bird data from the card's data attribute
          const birdData = JSON.parse(birdCard.dataset.bird);

          document.getElementById("popOutName").textContent =
            birdData.english_name + " (" + birdData.primary_name + ")";
          document.getElementById("popOutImage").src = birdData.photo.source;
          document.getElementById("popOutDescription").textContent =
            birdData.status;
          document.getElementById("popOutScientificName").textContent =
            birdData.scientific_name;
          document.getElementById("popOutOrder").textContent = birdData.order;
          document.getElementById("popOutFamily").textContent = birdData.family;
          document.getElementById("popOutOtherNames").textContent =
            birdData.other_names.join(", ");
          document.getElementById("popOutLength").textContent =
            birdData.size.length.value + " " + birdData.size.length.units;
          document.getElementById("popOutWeight").textContent =
            birdData.size.weight.value + " " + birdData.size.weight.units;

          document.getElementById("birdPopOut").style.display = "block";
        }
      });
  });
}

function birdsFilter(wordInput) {
  //Create const
  const birdsCard = document.querySelectorAll(".bird-card");

  birdsCard.forEach((card) => {
    //Ensures that birds name is normalized and lowercase
    const birdsName = card
      .querySelector("h2")
      .textContent.normalize("NFC")
      .toLowerCase();
    if (birdsName.includes(wordInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterStatus(status) {
  //Create birdsCard
  const birdsCard = document.querySelectorAll(".bird-card");

  birdsCard.forEach((card) => {
    //Status const
    const birdStat = card.querySelector("p").textContent.toLowerCase();
    const cleanerStat = status.replace("-", " ");

    if (status === "" || birdStat === cleanerStat) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
