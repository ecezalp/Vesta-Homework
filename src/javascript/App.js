import React, {Component} from 'react';
import '../App.css';
import {Col, Grid, Row, Button} from 'react-bootstrap';
import PopulationDisplayer from './components/PopulationDisplayer';
import PopulationRepository from './repositories/PopulationRepository'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        worldPopulationToday: "",
        usPopulationToday: "",
      }
  }

  componentWillMount() {
    let populationRepository = new PopulationRepository;
    populationRepository.getCountryPopulationOfDate("World", this.getTodaysDate()).then(
      (response) => this.setState({worldPopulationToday: response})
    );
    populationRepository.getCountryPopulationOfDate("United States", this.getTodaysDate()).then(
      (response) => this.setState({usPopulationToday: response})
    );
  }

  getTodaysDate() {
    return new Date().toJSON().slice(0, 10);
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="nav-grid">
            <Col md={6} xsOffset={6}>
              <h3>World Population Application</h3>
            </Col>
            <Col md={6} mdPull={6}>
              <PopulationDisplayer title="World Population" date="As of Today" population={this.state.worldPopulationToday}/>
            </Col>
            <Col md={6} mdPull={6}>
              <PopulationDisplayer title="US Population" date="As of Today" population={this.state.usPopulationToday}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
