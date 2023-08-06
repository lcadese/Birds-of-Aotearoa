

document.addEventListener("DOMContentLoaded", () =>{
    //fetchData 
    fetchData();
    
    //Create searchBox and searchButton to use
    const searchBox = document.querySelector('#search-box');
    const searchButton = document.querySelector('#status-form button');

    //Create event listener for when the user clicks search
    searchButton.addEventListener('click', (click) =>{
        click.preventDefault();
        const wordInput = searchBox.value.normalize("NFC").toLowerCase();
        birdsFilter(wordInput);
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
  });
}

function birdsFilter(wordInput){
    //Create const
    const birdsCard = document.querySelectorAll('.bird-card');
    
    birdsCard.forEach(card =>{
        //Ensures that birds name is normalized and lowercase
        const birdsName = card.querySelector('h2').textContent.normalize("NFC").toLowerCase();
        if (birdsName.includes(wordInput)){
            card.style.display = 'block';
        }else{
            card.style.display = 'none';
    }


        });



}