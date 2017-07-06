import React from 'react';
import axios from 'axios';
import API_BASE_LINK from '../constants'

export default class PopulationRepository {
  getCountryPopulationOfDate(countryName, date){
    return axios.get(API_BASE_LINK + "/population/" + countryName + "/" + date).then(
      response => response.data.total_population.population
    )
  }
}