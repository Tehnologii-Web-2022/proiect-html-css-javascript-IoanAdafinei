const apikey = "563492ad6f9170000100000162dfdb4a6b2442a38521cde70e583d27";
const page_num = 1;

async function searchPhotos(query, page_num) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apikey,
      },
    }
  );
  const response = await data.json();
  console.log(response);
  display_images(response);
}

function display_images(response) {
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.innerHTML = `<p class="center"><img class="cityimg" src=${image.src.large} ></p>`;
    document.querySelector(".display_images").appendChild(photo);
  });
}

function cleargallery() {
  document.querySelector(".display_images").innerHTML = "";
}

function fetchWeatherData(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=351a7599b0398e628c3c643a1f8d4ac5`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherDataElement = document.querySelector("#weather-data");
      let t = data.main.temp;
      let id_condition = data.weather[0].icon;
      let tmp = t.toFixed();
      cleargallery();
      searchPhotos(location, page_num);

      weatherDataElement.innerHTML = `
              <p class="centered">The weather in ${location} is currently ${
        data.weather[0].description
      } </p><p class="temp"><img src = "http://openweathermap.org/img/wn/${id_condition}@2x.png">
              ${tmp - 273}°C</p>
            `;
    });
}

function initialize() {
  document.body.style.padding = "20px";
  document.body.style.paddingLeft = "13vw"
}

initialize();
fetchWeatherData("Bucharest");
