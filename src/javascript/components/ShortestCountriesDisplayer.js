import React from 'react';
import {Button} from 'react-bootstrap';

class ShortestCountriesDisplayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      buttonText: "Fetch",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({show: !this.state.show});
    this.setState({buttonText: this.state.buttonText === "Fetch" ? "Hide" : "Fetch"})
  }

  countPopulation(){
    let totalPopulation = 0;
    let totalCountryNumber = 0;

    this.props.fullInfoOfShortest.forEach((country) => {
      totalCountryNumber++;
      totalPopulation += country.total;
    });
    return {totalPopulation: totalPopulation, totalCountryNumber: totalCountryNumber};
  }

  totalPopulationDisplayer(){
    let cumulative = this.countPopulation();
    
    return <div className="population-sum" hidden={!this.state.show}>
      <span className="sum-population-of-countries"> Total Population of Countries: {cumulative.totalPopulation}</span>
      <span className="sum-no-of-countries"> Number of Countries: {cumulative.totalCountryNumber}</span>
    </div>;
  }

  grid() {
    return this.props.fullInfoOfShortest.map((country, index) =>
      <div className="shortest-country-cell" hidden={!this.state.show} key={index}>
        <div id="left">
          <h4>{country.country}</h4>
          <h5>Total Population: {country.total}</h5>
        </div>
        <div id="right">
          <h5>Male Population: {country.males}</h5>
          <h5>Female Population: {country.females}</h5>
        </div>
      </div>);
  }

  render() {
    return (
      <div>
        <h3> Shortest Country Names</h3>
        <h5> Populations of countries with shortest names </h5>
        <Button onClick={this.handleClick}>{this.state.selectedGender}</Button>
        {this.totalPopulationDisplayer()}
        {this.grid()}
      </div>
    );
  }
}

export default ShortestCountriesDisplayer;