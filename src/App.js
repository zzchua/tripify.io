import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*global chrome*/
// itineraries : [{}, {}...]
const development = true;
const testData = [
  {
    flights: [
      {
        departureDate: "Tue May 14",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Narita Intl. (NRT)"
      },
      {
        departureDate: "Wed May 27",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Seattle - Tacoma Intl. (SEA)"
      }],
      price: "$1000.53",
  },
  {
    flights: [
      {
        departureDate: "Tue May 14",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Narita Intl. (NRT)"
      },
      {
        departureDate: "Wed May 27",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Seattle - Tacoma Intl. (SEA)"
      },
      {
        departureDate: "Wed May 27",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Seattle - Tacoma Intl. (SEA)"
      }],
      price: "$3000.53",
  },
  {
    flights: [
      {
        departureDate: "Tue May 14",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Narita Intl. (NRT)"
      },
      {
        departureDate: "Wed May 27",
        origin: "Seattle - Tacoma Intl. (SEA)",
        destination: "Seattle - Tacoma Intl. (SEA)"
      }],
      price: "$1000.53",
  }];

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
            <div className='flightContainer'>
              <div className='fromToContainer'>
                <p className='flight-detail-line origin-line'>From: {this.state.itineraries[i].flights[j].origin}</p>
                <p className='flight-detail-line destination-line'>To: {this.state.itineraries[i].flights[j].destination}</p>
              </div>
              <p className='flight-detail-line date-line'>Departure Date: {this.state.itineraries[i].flights[j].departureDate}</p>
            </div>
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
    if (development) {
      this.setState({itineraries: testData});
    } else {
      chrome.storage.local.get({itineraries: []}, (data) => {
        const itineraries = data.itineraries;
        this.setState({itineraries: itineraries});
      });
    }
    
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
