import axios from 'axios';
import * as _ from 'lodash';
import API_BASE_LINK from '../helpers/constants'

export default class PopulationRepository {

  findAllCountries() {
    return axios.get(API_BASE_LINK + "/countries").then(
      (response) => {
        return response.data.countries.filter(country => country !== country.toUpperCase());
      }
    )
  }

  getLocationPopulationOfDate(countryName, date) {
    return axios.get(API_BASE_LINK + "/population/" + countryName + "/" + date).then(
      response => response.data.total_population.population
    )
  }

  fetchShortestCountries() {
    return this.findAllCountries().then(
      (response) => {
        let sortedByLength = _.sortBy(response, [country => country.length]);
        let shortest = sortedByLength[0].length;
        return sortedByLength.filter(country => country.length === shortest);
      }
    )
  }

  fetchFullInfo(country) {
    let year = this.getCurrentYear();
    return axios.get(API_BASE_LINK + `/population/${year}/${country}/18`).then(
      response => response.data
    )
  }

  fetchRanking(dob, gender){
    return axios.get(API_BASE_LINK + `/wp-rank/${dob}/${gender}/World/today/`).then(
      response => response.data
    )
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}