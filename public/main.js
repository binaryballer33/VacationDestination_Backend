function getDestinationPic() { 
  const UNSPLASH_API_KEY =  "tBgnyrVJ2cg_l1J8aDQATD8sxAT0TMqykSptE5qmz5c";
  const endpoint = `https://api.unsplash.com/search/photos?query=${destinationName.value}&client_id=${UNSPLASH_API_KEY}`;   
  const makeApiCall = async () => {
      const res = await fetch(endpoint)
      const jsonData = await res.json()
      const randomNumber = Math.floor(Math.random() * jsonData.results.length);
      return jsonData.results[randomNumber].urls.thumb;
  }
  const imgUrl = makeApiCall();
  return imgUrl;
}

function editDestinationPic(newName) { 
  const UNSPLASH_API_KEY =  "tBgnyrVJ2cg_l1J8aDQATD8sxAT0TMqykSptE5qmz5c";
  const endpoint = `https://api.unsplash.com/search/photos?query=${newName}&client_id=${UNSPLASH_API_KEY}`;   
  const makeApiCall = async () => {
      const res = await fetch(endpoint)
      const jsonData = await res.json()
      const randomNumber = Math.floor(Math.random() * jsonData.results.length);
      return jsonData.results[randomNumber].urls.thumb;
  }
  const imgUrl = makeApiCall();
  return imgUrl;
}

function getWeather() {
const OPEN_WEATHER_API_KEY = "916cc6e2f739585a861d79122e62c7d6";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      let endpoint = 
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

      fetch(endpoint)
      .then((response) => response.json())
      .then((weatherData) => {
          let temp = weatherData.main.temp;
          const weatherH2Tag = document.querySelector("#weather");
          weatherH2Tag.innerText = `Weather ${temp}ºF`;
          return temp;
      })
      .catch((errors) => {
          console.log(errors);
      })
  });
}
}

getWeather();
const destinationName = document.querySelector("#name");
const destinationLocation = document.querySelector("#location");
const addToListButton = document.querySelector(".btn");

// convert html collection into a array, add the eventListener to each removeButton in the array
const editButton = Array.from(document.getElementsByClassName("editButton"));
const removeButton = Array.from(document.getElementsByClassName("removeButton"));
const seeMoreText = Array.from(document.getElementsByClassName("seeMoreText"));


addToListButton.addEventListener("click", async () => {
    // HTTP POST REQUEST 
    const imageUrl = await getDestinationPic();
    const res = await fetch("https://vacation-destination-ejs-shaqm.herokuapp.com/", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          destinationName: destinationName.value,
          destinationLocation: destinationLocation.value,
          imageUrl: imageUrl,
        })
      })
    const json = await res.json();
});

editButton.forEach( (button) => {
  button.addEventListener("click", async (event) => {
    const cardId = event.target.parentElement.parentElement.parentElement.id;
    
    const cardTitle = event.target.parentElement.parentElement.children[0];
    let newName = prompt("Enter new name");

    const cardSubTitle = event.target.parentElement.parentElement.children[1];
    let newLocation = prompt("Enter new location");

    const img = event.target.parentElement.parentElement.parentElement.children[0];

    const imageUrl = await editDestinationPic(newName);
    fetch("https://vacation-destination-ejs-shaqm.herokuapp.com/", {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: cardId,
        destinationName: newName,
        destinationLocation: newLocation,
        imageUrl: imageUrl,
      })
    })
    .then(() => {
      cardTitle.innerText = newName;
      cardSubTitle.innerText = newLocation;
      img.setAttribute("src", imageUrl)
    })
    .catch((error) => console.error(error))
  })
})

removeButton.forEach( (button) => {
  button.addEventListener("click", (event) => {
    const cardId = event.target.parentElement.parentElement.parentElement.id;
    fetch("https://vacation-destination-ejs-shaqm.herokuapp.com/", {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: cardId
      })
    })
    .then((response) => {
      window.location.reload(true);
      return response.json;
    })
    .catch((error) => console.error(error))
  })
});

seeMoreText.forEach( (element) => {
  element.addEventListener("click", (event) => {
    const cardId = event.path[2].id;
    window.open(`https://vacation-destination-ejs-shaqm.herokuapp.com/seeMore/${cardId}`);
  })
});



