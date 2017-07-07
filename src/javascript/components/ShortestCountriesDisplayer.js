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

  componentWillMount() {
    // this.props.fetchFullInfo(this.props.shortestCountries);
  }

  handleClick() {
    this.setState({showGrid: !this.state.showGrid})
  }

  grid(fullInfoArray) {
    return fullInfoArray.map((country, index) =>
      <div className="shortest-country-cell" hidden={!this.state.showGrid} key={index}>
        <div id="left">
          <h4>{country.country}</h4>
          <h5>Total Population: {country.total}</h5>
        </div>
        <div id="right">
          <h4>Male Population: {country.males}</h4>
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
        {this.grid(this.props.fullInfoOfShortest)}
      </div>
    )
  }
}
;

export default ShortestCountriesDisplayer;