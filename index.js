'use strict';

const generateOutput = require('./src/services/outputGenerator');
const getCustomerList = require('./src/services/customersReader');

const distanceScope = 100; //km 

// 1. Read full customer list
// 2. Filter and store those who within 100 km
// 3. Generate output.txt to display the result
getCustomerList()
  .then((customerList) => {
    return customerList.filter(filterListByDist);
  }).then((filteredList) => {
    generateOutput(sortByIdAsc(filteredList));
  });

function filterListByDist(data) {
  return data.distance <= distanceScope;
}

function sortByIdAsc(list) {
  return list.sort((a, b) => { return a.id - b.id });
}

