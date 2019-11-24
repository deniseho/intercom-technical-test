'use strict';

const http = require('http');

const config = require('./config');

const Customer = require('./src/models/Customer');

const getDistance = require('./src/services/distantCalculator');
const generateOutput = require('./src/services/outputGenerator');

const distanceScope = 100; //km 
const intercomPos = { x: 53.339428, y: -6.257664 };


// 1. Read full customer list
// 2. Filter and store those who within 100 km
// 3. Generate output.txt to display the result
getCustomerList()
  .then((customerList) => {
    return customerList.filter(filterListByDist);
  }).then((filteredList) => {
    generateOutput(sortByIdAsc(filteredList));
  });


function getCustomerList() {
  let customerList = [];

  return new Promise(function (resolve, reject) {
    let request = http.request(config.options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
        let index = data.indexOf('\n');

        while (index > -1) {
          let line = data.substring(0, index);
          data = data.substring(index + 1);
          index = data.indexOf('\n');
          addCustomerToList(line);
        }
      }).on('end', () => {
        console.log("Finished reading customer list");
        resolve(customerList);
      });
    });

    request.on('error', (e) => {
      reject(Error("Request Error: " + e.message));
    });

    request.end();
  });

  function addCustomerToList(data) {
    let customer = new Customer(JSON.parse(data));
    customer.distance = checkDistance(intercomPos, customer);
    customerList.push(customer);
  }
}


function filterListByDist(data) {
  return data.distance <= distanceScope;
}

function sortByIdAsc(list) {
  return list.sort((a, b) => { return a.id - b.id });
}

function checkDistance(start, end) {
  let startPos = start ? intercomPos : { x: start.x, y: start.y };
  let endPos = { x: end.x, y: end.y };

  return getDistance(startPos, endPos);
}
