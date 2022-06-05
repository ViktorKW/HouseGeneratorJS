////////////////////////////////////////model begin
const room_names = [
  "bedroom",
  "bathroom",
  "nursery",
  "study",
  "utility",
  "panic room",
  "living room",
  "dinning room",
  "kitchen",
  "mud room",
  "games room",
  "wine cellar",
  "conservatory",
  "locker room",
];

function room(
  room_name = room_names[Math.floor(Math.random() * room_names.length)] //assigns random room_name from array "room_names" as default value
) {
  this.get_room_name = () => {
    return this.room_name;
  };
  this.set_room_name = (room_name) => {
    this.room_name = room_name;
  };
  this.set_room_name(room_name); //init room name
}

function apartment() {
  this.get_appartment = () => {
    return this.rooms_array;
  };
  this.add_room = (room_name) => {
    this.rooms_array.push(new room(room_name));
  };
  this.add_rand_amt_rooms = () => {
    //adds random amount of rooms
    let amt_rooms_to_add = Math.floor(Math.random() * 5 + 1);
    for (let i = 0; i < amt_rooms_to_add; i++) {
      this.rooms_array.push(new room());
    }
  };
  this.remove_room = (room_name) => {
    let room_index = this.rooms_array.findIndex((element) => {
      return element.get_room_name() === room_name;
    });
    if (room_index >= 0) {
      this.rooms_array.splice(room_index, 1);
    } else {
      console.log(`Error! No such room ${room_name}`);
    }
    console.log(room_index);
  };

  this.construct_new_apartment = () => {
    this.rooms_array = [];
    this.add_room("mud room");
    this.add_room("living room");
    this.add_rand_amt_rooms();
  };

  this.construct_new_apartment();
}

function floor() {
  this.construct_new_floor = () => {
    this.apartments_array = [new apartment(), new apartment()];
  };
  this.construct_new_floor();
}

function big_house(amount_of_floors = 1) {
  //one floor = 2 apartments and 1 apartment = from 3 to 7 rooms
  this.construct_new_big_house = (amount_of_floors) => {
    this.floors_array = [new floor()];
    for (let i = 1; i < amount_of_floors; i++) {
      this.floors_array.push(new floor());
    }
  };
  this.construct_new_big_house(amount_of_floors);
}
///////////////////////////////////////model end

///////////////////////////////////////drawing part
function createRoomElement(room_obj) {
  const new_room_element = document.createElement("p");
  new_room_element.appendChild(
    document.createTextNode(room_obj.get_room_name())
  );
  new_room_element.className += "room-style";
  return new_room_element;
}

function createApartmentElement(apartment_obj) {
  const new_apartment_element = document.createElement("div");

  apartment_obj.rooms_array.forEach((room_obj) => {
    const new_room_element = createRoomElement(room_obj);
    new_apartment_element.appendChild(new_room_element);
  });

  new_apartment_element.className += "apartment-style";

  return new_apartment_element;
}

function createLadderElement() {
  const new_ladder_element = document.createElement("p");
  new_ladder_element.appendChild(document.createTextNode("Ladder"));
  new_ladder_element.className += "room-style";
  return new_ladder_element;
}

function createFloorElement(floor_obj) {
  const new_floor_element = document.createElement("div");

  floor_obj.apartments_array[0].rooms_array.reverse();
  const first_apartm_element = createApartmentElement(
    floor_obj.apartments_array[0]
  );
  new_floor_element.appendChild(first_apartm_element);

  first_apartm_element.style.align;

  const new_ladder_element = createLadderElement();
  new_floor_element.appendChild(new_ladder_element);

  const second_apartm_element = createApartmentElement(
    floor_obj.apartments_array[1]
  );
  new_floor_element.appendChild(second_apartm_element);

  return new_floor_element;
}

function createBigHouseElement(big_house_obj) {
  const new_big_house_element = document.createElement("div");

  big_house_obj.floors_array.forEach((floor_obj) => {
    const new_floor_element = createFloorElement(floor_obj);
    new_big_house_element.appendChild(new_floor_element);
  });

  new_big_house_element.className += "big-house-style";
  return new_big_house_element;
}

let myhouse = new big_house(10);
console.log(myhouse);

const big_house_element = createBigHouseElement(myhouse);

document.getElementById("content").appendChild(big_house_element);
////////////////////////////////////////drawing part end

console.log(myhouse.floors_array[0].apartments_array[0].rooms_array.reverse());
