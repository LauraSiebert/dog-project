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

function getDogImage(dogBreed, callback){
    console.log(`User entered ${dogBreed}.`)
    let photoDetails = {
        url:`https://dog.ceo/api/breed/${dogBreed}/images`,
        dataType: 'json',
        success: callback,
      }
    $.ajax(photoDetails);
}

function displayResults(info) {
    let photo = info.message[0];
    console.log(`Printing results: ${photo}`);
    console.log(`Status of request: ${info.status}`);
    $('.results').removeClass('hidden');
    $('.photo-results').html(`<h1>Check out this dog!</h1>`);
    if (info.status == "success"){
        return $('.photo-results').append(`<img src=${photo} class="results-img">`);
    } else {
        alert("That breed isn't avaliable. Please try again. ");
      }
}


$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});