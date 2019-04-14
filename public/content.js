// Define the function
const getItineraryDetails = () => {
  const itinerary = {flights: [], price: 0};
  const dateAndODList = document.querySelectorAll('div.dateAndOD');
  dateAndODList.forEach((dateAndODDiv) => {
    const departureDate = dateAndODDiv.querySelector('div.departureDate').innerText;
    const originDest = dateAndODDiv.querySelectorAll('div.airport');
    let flightDetails = {};
    flightDetails.origin = originDest[0].innerText;
    flightDetails.destination = originDest[1].innerText;
    flightDetails.departureDate = departureDate;
    itinerary.flights.push(flightDetails);
  });
  const itineraryPriceTotal = document.querySelector('.packagePriceTotal').innerText;
  itinerary.price = itineraryPriceTotal;
  return itinerary;
}

const tripTotalsDiv = document.querySelector('.tripTotals');
const addFlightToListButton = document.createElement("button"); // <button></button>
addFlightToListButton.className = "addToList";
addFlightToListButton.innerText = "Add to Tripify";
addFlightToListButton.addEventListener("click", () => {
  // Do something
  const itineraryDetails = getItineraryDetails();
  console.log("clicked");
  chrome.storage.local.get({itineraries: []}, (data) => {
    const itineraryList = data.itineraries;
    itineraryList.push(itineraryDetails); // [{ price: x, flights:[itinerar1]}, ...]

    chrome.storage.local.set({itineraries: itineraryList}, () => {
      console.log("updated flight list:");
      console.log(itineraryList);
      // chrome.storage.local.clear(() => {console.log('cleared');});
    });
  });
});

tripTotalsDiv.append(addFlightToListButton);