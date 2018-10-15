'use strict';

function watchForm() {
    $('#number-form').on('submit', (e) => {
      e.preventDefault();
      let dogBreed = $('#search-input').val().split('\n').map(
        // This is to reverse words and add a hyphen to two word dog breeds.
        function (line) {
          return line.split(/\s/).reverse().join(' ');
        }
      ).join('\n').replace(/\s+/g, '-').toLowerCase();
      console.log(`User entered ${dogBreed}.`);
      return dogBreed === '' ? alert('Please enter dog breed.') : getDogImage(dogBreed, displayResults);
    });
  }

  function getDogImage(dogBreed) {
    console.log(`User entered ${dogBreed}.`);
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images`)
      .then(response => response.json())
      .then(responseJson => 
        displayResults(responseJson))
      .catch(error => alert(`Something went wrong. Please try again.`));
}

function displayResults(info) {
    let photo = info.message[0];
    console.log(`Printing results: ${photo}`);
    console.log(`Status of request: ${info.status}`);
    $('.results').removeClass('hidden');
    if (info.status == "success"){
        return $('.photo-results').html(`<h1>Check out this dog!</h1>`).append(`<img src=${photo} class="results-img">`);
    } else {
        return alert("That dog breed isn't available. Please try a different selection.");
      }
}


$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});