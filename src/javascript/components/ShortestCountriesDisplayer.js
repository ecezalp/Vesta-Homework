import React from 'react';
import {Button} from 'react-bootstrap';

class ShortestCountriesDisplayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showGrid: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({showGrid: !this.state.showGrid})
  }

  totalPopulationDisplayer(){
    let totalPopulation = 0;
    let totalCountryNumber = 0;

    this.props.fullInfoOfShortest.forEach((country) => {
      totalCountryNumber++;
      totalPopulation += country.total;
    });

    return <div className="population-sum" hidden={!this.state.showGrid}>
      <span className="sum-population-of-countries"> Total Population of Countries: {totalPopulation}</span>
      <span className="sum-no-of-countries"> Number of Countries: {totalCountryNumber}</span>
    </div>
  }

  grid() {
    return this.props.fullInfoOfShortest.map((country, index) =>
      <div className="shortest-country-cell" hidden={!this.state.showGrid} key={index}>
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
        <Button onClick={this.handleClick}>Fetch</Button>
        {this.totalPopulationDisplayer()}
        {this.grid()}
      </div>
    )
  }
}

export default ShortestCountriesDisplayer;