const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// setMovieData(movieSelect.selectedIndex,ticketPrice);
populateUI();

function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
    if(selectedMoviePrice !== null){
        ticketPrice = selectedMoviePrice;
    }

}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatIndices = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndices));
    count.innerText = +selectedSeats.length;
    total.innerText = count.innerText * ticketPrice;
}

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(+e.target.selectedIndex, +e.target.value);
    updateSelectedCount();
})

container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
    }
    updateSelectedCount();
})

updateSelectedCount();