export class Game {
  constructor(city1, city2, city3, city4, city5, city6, city7, city8, city9, city10) {
    this.playerCity = city2;
    this.cities = [city1, city2, city3, city4, city5, city6, city7, city8, city9, city10];
    this.cityCards = [];
    this.flightOptions = [];
    this.eventCard = "";
    this.isGreenCured = false;
    this.isRedCured = false;
    this.actionsLeft = 2;

  }
}

export class Portland {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Denver, SanFransico];
  }
}
export class SanFransico {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Portland, La]
  }
}
export class La {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [SanFransico, Dallas]
  }
}
export class Dallas {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Denver, La, Atlanta]
  }
}
export class Denver {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Chicago, Dallas, Portland]
  }
}
export class Chicago {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Denver, Boston, Ny]
  }
}
export class Ny {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Chicago, Boston]
  }
}
export class Boston {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Chicago, Ny, Atlanta]
  }
}
export class Miami {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Atlanta, Dallas]
  }
}
export class Atlanta {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Dallas, Miami, Boston];
    this.isResearch = true


  }
}

const jetCard =  (game) => {
 game.flightCards = [Portland, SanFransico, La, Dallas, Denver, Chicago, Ny, Boston, Miami, Atlanta];

}
Game.prototype.move = function (clickedCity) {
// Clicked city is determined in the front end drop down
  this.playerCity = clickedCity;
  this.actionsLeft --;
};
Game.prototype.pass = function () {
  this.actionsLeft = 0
};

Game.prototype.pickDiseaseCity = function() {
  let i =  Math.floor(Math.random() * 10);
  this.cities[i].cubes = 4
}

Game.prototype.removeCube = function() {
  if (this.playerCity.cubes < 0) {
    if ((this.playerCity.color = "Red" && this.isRedCured = true) || (this.playerCity.color = "Green" && this.isGreenCured = true)) {
      this.playerCity.cubes = 0
    } else {
      this.playerCity.cubes --;
    }
    this.actionsLeft --;
  }
}
