const seeMoreText = Array.from(document.getElementsByClassName("seeMoreText"));

seeMoreText.forEach( (element) => {
    element.addEventListener("click", async (event) => {
      // created an id so that I can always update and replace the same document in the db
      const id = "7ab3498f90abcd33fc2324ab";
      const imageUrl = event.path[2].children[0].currentSrc;
      const destinationName = event.path[2].children[1].children[0].innerText;
      const destinationLocation = event.path[2].children[1].children[1].innerText;
  
  
      const res = await fetch("https://vacation-destination-ejs-shaqm.herokuapp.com/seeMore", {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          destinationName: destinationName,
          destinationLocation: destinationLocation,
          imageUrl: imageUrl,
        })
      })
      .then((response) => {
        window.open("/seeMore");
        return response.json()
      })
    })
  });