'use strict';

const http = require('http');
const config = require('../../config');

const Customer = require('../models/Customer');
const getDistance = require('./distantCalculator');

const intercomPos = { x: 53.339428, y: -6.257664 };

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

  function checkDistance(start, end) {
    let startPos = start ? intercomPos : { x: start.x, y: start.y };
    let endPos = { x: end.x, y: end.y };
  
    return getDistance(startPos, endPos);
  }
}

module.exports = getCustomerList;