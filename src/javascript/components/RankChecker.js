import React from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

export default class RankChecker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dOBValue: "",
      selectedGender: "Gender",
      fetchButtonText: "Fetch",
      errorMessage: null,
    };
    this.dateOfBirthField = this.dateOfBirthField.bind(this);
    this.genderDropDown = this.genderDropDown.bind(this);
    this.validateDOB = this.validateDOB.bind(this);
    this.displayFetchButton = this.displayFetchButton.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);

  }

  dateOfBirthField() {
    return <input placeholder="mm-dd-yyyy" onChange={e => this.setState({dOBValue: e.target.value})}/>
  }

  handleGenderChange(gender){
    this.setState({selectedGender: gender});
  }

  genderDropDown(currentGender) {
    return <DropdownButton title={currentGender}>
      <MenuItem onClick={() => this.handleGenderChange("Female")}>Female</MenuItem>
      <MenuItem onClick={() => this.handleGenderChange("Male")}>Male</MenuItem>
    </DropdownButton>
  }

  validateDOB() {
    let toBeValidated = this.state.dOBValue.split("-").join("");
    if (toBeValidated.length !== 7 ||
      0 > toBeValidated.slice(0, 1) > 12 ||
      0 > toBeValidated.slice(2, 3) > 31 ||
      1900 > toBeValidated.slice(4, 7) > 2017) {
     this.setState({errorMessage: "Incorrect Date!"});
    }
  }

  displayFetchButton() {
    return <Button onClick={this.handleFetch}>{this.state.fetchButtonText} </Button>
  }

  handleFetch() {
    this.setState({errorMessage: ""});
    this.validateDOB();
    this.setState({fetchButtonText: this.state.fetchButtonText === "Fetch" ? "Clear" : "Fetch"})
    if (this.state.errorMessage == "") {
      // this.props.fetchWorldRanking()
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
        {this.state.errorMessage}
      </div>
    )
  }
}