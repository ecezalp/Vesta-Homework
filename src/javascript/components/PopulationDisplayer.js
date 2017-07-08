import React from 'react';

export default function PopulationDisplayer(props) {

  return (<div className="population-displayer">
    <h1 id="population-displayer-title">{props.title}</h1>
    <div id="population-displayer-date" className="dark">{props.date}</div>
    <br/>
    <div id="population-displayer-population" className="dark">{props.population.toLocaleString()}</div>
  </div>);
}