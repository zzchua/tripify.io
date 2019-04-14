import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*global chrome*/
// itineraries : [{}, {}...]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {itineraries: []};
  }

  renderItinerary() {
    const itineraryRows = [];
    for (let i = 0; i < this.state.itineraries.length; i++) {
      const flights = this.state.itineraries[i].flights;
      const flightRows = [];
      for (let j = 0; j < flights.length; j++) {
        flightRows.push(
          <div className='flight-item'>
            <p>Departure Date: {this.state.itineraries[i].flights[j].departureDate}</p>
            <p>From: {this.state.itineraries[i].flights[j].origin}</p>
            <p>To: {this.state.itineraries[i].flights[j].destination}</p>
          </div>
        );
      }
      itineraryRows.push(
        <div className='itinerary-item'>
          {flightRows}
          <p>Total price: ${this.state.itineraries[i].price}</p>
        </div>
      )
    }
    return itineraryRows;
  }

  componentWillMount() {
    chrome.storage.local.get({itineraries: []}, (data) => {
      const itineraries = data.itineraries;
      this.setState({itineraries: itineraries});
    });
  }

  render() {
    console.log(this.state.itineraries);
    return (
      <div className="App">
        <div className="itinerary-list">
          {this.renderItinerary()}
        </div>
      </div>
    );
  }
}

export default App;
