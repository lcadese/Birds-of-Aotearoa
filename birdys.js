async function fetchData() {
  const response = await fetch("./data/nzbird.json");
  if (!response.ok) {
    console.error(response.status); // error handling
  }
  const data = await response.json(); // parse to JSON and await it
  console.log(data); // use the data
  showBirds(data);
}

function showBirds(birds) {
  //Create birdList const
  const birdList = document.querySelector("#bird-list");

  birds.forEach((bird) => {
    //Create a new bird card
    const birdCard = document.createElement("article");
    birdCard.classList.add("bird-card");

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
    birdStatusColor.classList.add(bird.status.toLowerCase().replace(/\s+/g, '-'));

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
  });
}
// Call fetchData 
document.addEventListener("DOMContentLoaded", fetchData);
