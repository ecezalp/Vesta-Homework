import React from 'react';
import {Button, Row} from 'react-bootstrap';

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

  countPopulation() {
    let totalPopulation = 0;
    let totalCountryNumber = 0;

    this.props.fullInfoOfShortest.forEach((country) => {
      totalCountryNumber++;
      totalPopulation += country.total;
    });
    return {totalPopulation: totalPopulation, totalCountryNumber: totalCountryNumber};
  }

  totalPopulationDisplayer() {
    let cumulative = this.countPopulation();
    return <div className="population-sum" hidden={!this.state.show}>
      <p><br/>
        <span
          className="sum-of-countries"> Total Population of Countries: {cumulative.totalPopulation.toLocaleString()}</span>
        <span className="sum-of-populations"> Number of Countries: {cumulative.totalCountryNumber}</span>
        <br/>
      </p>
    </div>;
  }

  grid() {
    return this.props.fullInfoOfShortest.map((country, index) =>
      <Row key={index}>
        <div className="shortest-cell" hidden={!this.state.show}>
          <div id="left">
            <p><b>{country.country}</b></p>
            <p>Total Population: {country.total.toLocaleString()}</p>
          </div>
          <div id="right">
            <p>Male Population: {country.males.toLocaleString()}</p>
            <p>Female Population: {country.females.toLocaleString()}</p>
          </div>
        </div>
      </Row>);
  }

  render() {
    return (
      <div>
        <br/>
        <h1> Shortest Country Names</h1>
        <p>Populations of countries with shortest names</p>
        <div>
          <Button onClick={this.handleClick}>{this.state.buttonText}</Button>
        </div>
        <div>
          {this.totalPopulationDisplayer()}
          {this.grid()}
        </div>
        <br/>
      </div>
    );
  }
}

export default ShortestCountriesDisplayer;