'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</${data.currencies[0].name}>CUR</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1;
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // Here we send of the request  Then that request  fetches the data in background and once that is done  it will emit the load event
//   request.send();

//   request.addEventListener('load', function () {
//     // Converting Json data into an object
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country
//     renderCountry(data);
//     // Get neighbour country 2
//     const [neighbour] = data.borders;

//     // AJAX call 2
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('usa');
// getCountryData('saudi');
// getCountryData('usa');

// Promise And Fetch API
// const request = fetch('https://restcountries.com/v2/name/portgual');
// console.log(request);

/////////////////////////////////////////
////CONSUMING PROMISES/////////
//////////////////////////////////////////
const getCountryData = function (country) {
  // calling the fetch func like this will then immediately return a promise so as soon as we start the req.
  // In beginning this promise is still pending because the ASYNDHRONOUS task of getting the data is still running in the background.
  // TO HANDEL THE FULLFILLED STATE WE CAN USE THE then method that is available on all promises.
  // In the CALL BACK FUN in THEN Method we Name the Argumet response because this is the Response of an AJAX Call
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);

      // Throwing errors manually//
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      // The JSON Method here is a Mehtod that is available on all the  response objects that is coming from the fetch function.
      // Now the Problem here is that this JSON fun itself is actually also an ASYC function... It will also return a new promise.
      // We need to return this promise from here because this also returns a promise.. We also need to handle that promise as well
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      //By returning this promise here then the fullfilled value of the next then method will be fullfilled value of this previous promise
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))

    ////////////////////////////
    ///// HANDLING REJECTED PROMISES//////
    .catch(err => console.log(`${err}`))
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('iran');
});
getCountryData('jjdhdjjd');
