function VehicleFactory() {}
VehicleFactory.prototype.vehicleClass = Car
VehicleFactory.prototype.createVehicle = function(options) {
  if (options.vehicleType === 'car') {
    this.vehicleClass = Car
  } else {
    this.vehicleClass = Truck
  }
  return new this.vehicleClass()
}

function Car(options) {
  this.doors = options.doors || 4
  this.state = options.state || 'brand new'
  this.color = options.color || 'silver'
}
function Truck(options) {
  this.state = options.state || 'used'
  this.wheelSize = options.wheelSize || 'large'
  this.color = options.color || 'blue'
}

var carFactory = new VehicleFactory()
car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6
})

// es6

class VehicleFactory {
  constructor() {
    this.vehicleClass = Car
  }
  createVehicle(options) {
    if (options.vehicleType === 'Car') {
      this.vehicleClass = Car
    } else {
      this.vehicleClass = Truck
    }
    return new this.vehicleClass(options)
  }
}

class Car {
  constructor() {
    options = options || ''
    this.doors = options.doors || 4
    this.state = options.state || 'brand new'
    this.color = options.color || 'silver'
  }
}
class Truck {
  constrctor() {
    this.state = options.state || 'used'
    this.wheelSize = options.wheelSize || 'large'
    this.color = options.color || 'blue'
  }
}

let carFactory = new VehicleFactory()
let car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6
})
