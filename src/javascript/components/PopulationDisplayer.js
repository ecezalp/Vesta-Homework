/**
 * Created by eceozalp on 7/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function PopulationDisplayer(props) {

  return (<div className="population-displayer">
    <h3 id="population-displayer-title">{props.title}</h3>
    <div id="population-displayer-date" className="dark">{props.date}</div>
    <br/>
    <div id="population-displayer-population" className="dark">{props.population}</div>
  </div>);
}

PopulationDisplayer.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  population: PropTypes.string,
};

