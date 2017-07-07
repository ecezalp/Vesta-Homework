import React from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {validYear, validMonth, validDay} from "../helpers/dateHelper";

export default class RankChecker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dOBValue: "",
      selectedGender: "Gender",
      buttonText: "Fetch",
      dOBErrorMessage: null,
      genderErrorMessage: null,
    };
    this.dateOfBirthField = this.dateOfBirthField.bind(this);
    this.genderDropDown = this.genderDropDown.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.validateGender = this.validateGender.bind(this);
    this.validateDOB = this.validateDOB.bind(this);
    this.displayFetchButton = this.displayFetchButton.bind(this);
    this.parseWorldRanking = this.parseWorldRanking.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  dateOfBirthField() {
    return <input placeholder="mm-dd-yyyy" onChange={e => this.setState({dOBValue: e.target.value})} value={this.state.dOBValue}/>
  }

  handleGenderChange(gender) {
    this.setState({selectedGender: gender});
  }

  genderDropDown(currentGender) {
    return <DropdownButton title={currentGender}>
      <MenuItem onClick={() => this.handleGenderChange("Female")}>Female</MenuItem>
      <MenuItem onClick={() => this.handleGenderChange("Male")}>Male</MenuItem>
    </DropdownButton>
  }

  validateDOB() {
    let errorMessage = "";
    let toBeValidated = (this.state.dOBValue.trim());
    if (toBeValidated.length !== 10 ||
      !validDay(toBeValidated.slice(3, 5)) ||
      !validMonth(toBeValidated.slice(0, 2)) ||
      !validYear(toBeValidated.slice(6, 10))) {
      errorMessage = "Invalid Date"
    }
    this.setState({dOBErrorMessage: errorMessage});
  }

  displayFetchButton() {
    return <Button onClick={this.handleButtonClick}>{this.state.buttonText} </Button>
  }

  formatDOBforRequest(date) {
    return date.slice(6, 10) + "-" + date.slice(0, 2) + "-" + date.slice(3, 5);
  }

  validateGender() {
    let errorMessage = "";
    if (!(this.state.selectedGender === "Male" || this.state.selectedGender === "Female")) {
      errorMessage = "Non-Binary not supported";
    }
    this.setState({genderErrorMessage: errorMessage});
  }

  handleButtonClick() {
    this.state.buttonText === "Fetch" ? this.handleFetch() : this.handleClear();
  }

  handleClear() {
    this.setState({
      dOBValue: "",
      selectedGender: "Gender",
      buttonText: "Fetch",
      dOBErrorMessage: null,
      genderErrorMessage: null,
    });
  }


  handleFetch() {
    this.handleClear();
    this.validateDOB();
    this.validateGender();

    // if (this.state.dOBErrorMessage === "" && this.state.genderErrorMessage === "") {
      this.props.fetchRank(this.formatDOBforRequest(this.state.dOBValue), this.state.selectedGender.toLowerCase()).then(
        (response) => {
          this.setState({worldRanking: response});
        }
      );
    // }

    this.setState({buttonText: "Clear"});
  }

  parseWorldRanking() {
    if (this.state.worldRanking) {
      let ranking = this.state.worldRanking;
      return (<div className="world-ranking">
        <div id="left">
          <h5>DOB: {ranking.dob}</h5>
          <h5>Gender: {ranking.sex}</h5>
        </div>
        <div id="right">
          <h4>Your Rank in the World </h4>
          <h5>You are ranked {ranking.rank}</h5>
        </div>
      </div>);
    }
  }

  render() {
    return (
      <div>
        <h3>Check Your Ranking</h3>
        Enter your information to check where you rank
        {this.dateOfBirthField()}
        {this.genderDropDown(this.state.selectedGender)}
        {this.displayFetchButton()}
        {this.state.dOBErrorMessage}
        {this.state.genderErrorMessage}
        {this.parseWorldRanking()}
      </div>
    )
  }
}