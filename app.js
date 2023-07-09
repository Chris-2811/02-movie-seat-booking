const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// Populate the UI with the data
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== '' || selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) !== -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovie = localStorage.getItem('movieIndex');

  if (selectedMovie !== null) {
    movieSelect.selectedIndex = selectedMovie;
  }

  updateCount();
}

// Add movie data to local storage
function addData(moviePrice, movieIndex) {
  localStorage.setItem('moviePrice', moviePrice);
  localStorage.setItem('movieIndex', movieIndex);
}

// Update count and total
function updateCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * movieSelect.value;
}

// Add Eventlistener
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateCount();
  }
});

movieSelect.addEventListener('change', (e) => {
  addData(e.target.value, e.target.selectedIndex);
  updateCount();
});
