const assert = require('assert');
const should = require('should');

const Customer = require('../src/models/Customer');

const getDistance = require('../src/services/distantCalculator');
const checkDistance = require('../src/services/distantCalculator');



describe('Get customer distance tests', () => {

  it('Should return 0 if the start and the end share the same position', done => {
    let start = {x: 1, y: 2};
    let end = {x: 1, y: 2};
    let distance = getDistance(start, end);
    distance.should.equal(0);
    done();
  })

  it('Should return NaN when the latitute and the longtitute of the customer are undefined', done => {
    let start = {x: 1, y: 2};
    let end = {x: undefined, y: undefined};
    let distance = getDistance(start, end);
    isNaN(distance).should.equal(true);
    done();
  })

  it('Should return NaN when the latitute and the longtitute of the customer cannot be parsed into floats', done => {
    let start = {x: 1, y: 2};
    let end = {x: 'test', y: 'test'};
    let distance = getDistance(start, end);
    isNaN(distance).should.equal(true);
    done();
  })

})

describe('Check customer distance tests', () => {

  it('Should return true if the position of the customer is within 100km', done => {
    let customer = new Customer({"latitude": "53", "user_id": 100, "name": "Chia Ying Ho", "longitude": "-6"});
    let intercomPos = { x: 53.339428, y: -6.257664 };
    
    let distance = checkDistance(intercomPos, customer);
    (distance <= 100).should.equal(true);
    done();
  })

  it('Should return false if the position of the customer is not within 100km', done => {
    let intercomPos = { x: 53.339428, y: -6.257664 };
    let customer = new Customer({"latitude": "1000", "user_id": 100, "name": "Chia Ying Ho", "longitude": "-1000"});
    
    const distance = checkDistance(intercomPos, customer);
    (distance <= 100).should.equal(false);
    done();
  })

})
