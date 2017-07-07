import React, {Component} from 'react';
import '../App.css';
import {Col, Grid, Row} from 'react-bootstrap';
import {getTodaysDate} from "./helpers/dateHelper";
import PopulationRepository from './repositories/PopulationRepository';
import PopulationDisplayer from './components/PopulationDisplayer';
import ShortestCountriesDisplayer from './components/ShortestCountriesDisplayer';
import RankChecker from './components/RankChecker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldPopulationToday: "",
      usPopulationToday: "",
      fullInfoOfShortest: [],
    };
    this.repository = new PopulationRepository();
    this.fetchDataForPopulationDisplayer = this.fetchDataForPopulationDisplayer.bind(this);
    this.fetchShortestCountries = this.fetchShortestCountries.bind(this);
    this.fetchFullInfo = this.fetchFullInfo.bind(this);
  }

  componentWillMount() {
    this.fetchDataForPopulationDisplayer();
    this.fetchShortestCountries();
  }

  fetchDataForPopulationDisplayer() {
    this.repository.getLocationPopulationOfDate("World", getTodaysDate()).then(
      response => this.setState({worldPopulationToday: response})
    );
    this.repository.getLocationPopulationOfDate("United States", getTodaysDate()).then(
      response => this.setState({usPopulationToday: response})
    );
  }

  fetchShortestCountries() {
    this.repository.fetchShortestCountries().then(
      response => this.fetchFullInfo(response)
    );
  }

  fetchFullInfo(countryArray) {
    let fullInfoArray = [];
    countryArray.forEach((country) => {
      this.repository.fetchFullInfo(country).then(
        response => fullInfoArray.push(response[0])
      )
    });
    this.setState({fullInfoOfShortest: fullInfoArray})
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={6} xsOffset={6}>
              <h1>World Population Application</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <PopulationDisplayer title="World Population"
                                   date="As of Today"
                                   population={this.state.worldPopulationToday}/>
            </Col>
            <Col xs={6} md={4}>
              <PopulationDisplayer title="US Population"
                                   date="As of Today"
                                   population={this.state.usPopulationToday}/>
            </Col>
          </Row>

          <ShortestCountriesDisplayer fullInfoOfShortest={this.state.fullInfoOfShortest}/>

          <RankChecker fetchRank={this.repository.fetchRanking}/>

        </Grid>
      </div>
    );
  }
}

export default App;
