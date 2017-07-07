import React, {Component} from 'react';
import '../App.css';
import PopulationDisplayer from './components/PopulationDisplayer';
import PopulationRepository from './repositories/PopulationRepository';
import ShortestCountriesDisplayer from './components/ShortestCountriesDisplayer'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldPopulationToday: "",
      usPopulationToday: "",
      shortestCountries: [],
      fullInfoOfShortest: [],
    };
    this.fetchDataForPopulationDisplayer = this.fetchDataForPopulationDisplayer.bind(this);
    this.fetchShortestCountries = this.fetchShortestCountries.bind(this);
    this.fetchFullInfo = this.fetchFullInfo.bind(this);
    this.repository = new PopulationRepository()
  }

  componentWillMount() {
    this.fetchDataForPopulationDisplayer();
    this.fetchShortestCountries();
    this.fetchFullInfo(this.state.shortestCountries);
  }

  fetchDataForPopulationDisplayer(repository){
    this.repository.getLocationPopulationOfDate("World", this.getTodaysDate()).then(
      (response) => this.setState({worldPopulationToday: response})
    );
    this.repository.getLocationPopulationOfDate("United States", this.getTodaysDate()).then(
      (response) => this.setState({usPopulationToday: response})
    );
  }

  fetchShortestCountries(){
    this.repository.fetchShortestCountries().then(
      (response) => {
        this.setState({shortestCountries: response});
        this.fetchFullInfo(this.state.shortestCountries);
      }
    );
  }

  fetchFullInfo(countryArray){
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
          <ShortestCountriesDisplayer fullInfoOfShortest={this.state.fullInfoOfShortest} />
      </div>
    );
  }
}

export default App;
