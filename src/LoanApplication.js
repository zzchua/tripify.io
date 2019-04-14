import React, { Component } from 'react';
import './LoanApplication.css';

export default class LoanApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      zipcode: "",
      dateOfBirth: "",
      educationLevel: "",
      ssn: "",
      employmentStatus: "",
      annualIncome: 0,
      monthlyNetIncome: 0,
      employmentPayFrequency: "",
      jobTitle: "",
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          First Name:
          <input
            name="firstName"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input
            name="lastName"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          City:
          <input
            name="city"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          State:
          <input
            name="state"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Zipcode:
          <input
            name="zipcode"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Date of birth (YYYY-MM-DD):
          <input
            name="dateOfBirth"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Date of birth (YYYY-MM-DD):
          <input
            name="dateOfBirth"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
      </form>
    );
  }
}