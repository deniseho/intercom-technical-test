class Customer {
  constructor(info) {
    this.id = info.user_id;
    this.name = info.name;
    this.x = parseFloat(info.latitude);
    this.y = parseFloat(info.longitude);
  }
}

module.exports = Customer;