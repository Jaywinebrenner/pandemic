export class Game {
  constructor() {
    this.playerCity = Portland;
    this.cities = [Portland, SanFransico, La, Dallas, Denver, Chicago, Ny, Boston, Miami, Atlanta];
    this.cityCards = [];
    this.flightOptions = [];
    this.eventCard = "";
    this.isGreenCured = false;
    this.isRedCured = false;

  }
}

class Portland {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Denver, SanFransico];
  }
}
class SanFransico {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Portland, La]
  }
}
class La {
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
class Denver {
  constructor (){
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [Chicago, Dallas, Portland]
  }
}
class Chicago {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Denver, Boston, Ny]
  }
}
class Ny {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Chicago, Boston]
  }
}
class Boston {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Chicago, Ny, Atlanta]
  }
}
class Miami {
  constructor (){
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [Atlanta, Dallas]
  }
}
class Atlanta {
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
Game.prototype.drive = function (clickedCity) {
// Clicked city is determined in the front end drop down
  this.playerCity = clickedCity
};
