// import React from 'react';
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils';
// import PopulationDisplayer from '../../javascript/components/PopulationDisplayer'
//
// describe('Population Displayer', () => {
//   let component, displayerNode;
//
//   beforeEach(()=> {
//     component = TestUtils.renderIntoDocument(<PopulationDisplayer title="Test Title"
//                                              date="Yesterday"
//                                              population="10,000,000"/>);
//     displayerNode = ReactDOM.findDOMNode(component);
//   });
//
//   it('renders its props as children', () => {
//     expect(displayerNode.find('.population-displayer').length).toEqual(3);
//       // .find().children().length).toBe(3);
//   });
//
//   it('renders the title on the page', () => {
//     expect(component.find('h3').children()).toContain("Test Title");
//     expect(component.find('#population-displayer-title')).toContain("Test Title");
//   });
//   //
//   // it('renders the date on the page', () => {
//   //   expect(component.find('#population-displayer-date')).toContain("Yesterday");
//   // });
//   //
//   // it('renders the population on the page', () => {
//   //   component.find('#population-displayer-population').text("10,000,000");
//   // });
//
// // });