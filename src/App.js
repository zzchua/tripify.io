import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoanApplication from './LoanApplication.js';

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
    this.state = {itineraries: [], showLoanApplication: false};
    this.onNavLoanApplication = this.onNavLoanApplication.bind(this);
  }

  renderItinerary() {
    const itineraryRows = [];
    for (let i = 0; i < this.state.itineraries.length; i++) {
      const flights = this.state.itineraries[i].flights;
      const flightRows = [];
      for (let j = 0; j < flights.length; j++) {
        flightRows.push(
          <div className='flight-item' key={j}>
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
        <div className='itinerary-item' key={i}>
          {flightRows}
          <p>Total price: {this.state.itineraries[i].price}</p>
        </div>
      )
    }
    return itineraryRows;
  }

  renderMain() {
    return (
      <div className="main">
          <div className="itinerary-list">
            {this.renderItinerary()}
          </div>
          <div className="get-offer-container">
            <button onClick={this.onNavLoanApplication}>Finance your vacation with a loan for ${this.getTotalPrice()}</button>
          </div>
        </div>
    );
  }

  renderLoanApplication() {
    return (
      <LoanApplication totalLoanValue={this.getTotalPrice()}/>
    );
  }

  onNavLoanApplication() {
    this.setState({showLoanApplication: true});
  }

  getTotalPrice() {
    let price = 0;
    for (let i = 0; i < this.state.itineraries.length; i++) {
      const priceString = this.state.itineraries[i].price.replace(',' ,'');
      priceString = priceString.replace('$', '');
      let itineraryPrice = parseFloat(priceString);
      price += itineraryPrice;
    }
    return price;
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
    if (!this.state.showLoanApplication) {
      return this.renderMain();
    } else {
      return this.renderLoanApplication();
    }
  }
}

export default App;
