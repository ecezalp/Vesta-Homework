import React, {Component} from 'react';
import '../App.css';
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
    this.repository.getLocationPopulationOfDate("World", this.getTodaysDate()).then(
      response => this.setState({worldPopulationToday: response})
    );
    this.repository.getLocationPopulationOfDate("United States", this.getTodaysDate()).then(
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

  getTodaysDate() {
    return new Date().toJSON().slice(0, 10);
  }

  render() {
    return (
      <div className="App">
        <h3>World Population Application</h3>
        <PopulationDisplayer title="World Population" date="As of Today"
                             population={this.state.worldPopulationToday}/>
        <PopulationDisplayer title="US Population" date="As of Today" population={this.state.usPopulationToday}/>
        <ShortestCountriesDisplayer fullInfoOfShortest={this.state.fullInfoOfShortest}/>
        <RankChecker fetchRank={this.repository.fetchRanking}/>
      </div>
    );
  }
}

export default App;
