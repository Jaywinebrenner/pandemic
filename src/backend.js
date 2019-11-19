export class Game {
  constructor(city1, city2, city3, city4, city5, city6, city7, city8, city9, city10) {
    this.playerCity = city2;
    this.cities = [city1, city2, city3, city4, city5, city6, city7, city8, city9, city10];
    this.cityCards = [];
    this.flightOptions = [];
    this.eventCards = ["jetCard", "adrenelineCard"];
    this.eventCard = "";
    this.isGreenCured = false;
    this.isRedCured = false;
    this.actionsLeft = 2;
    this.greenResearchPoints = 0;
    this.redReasearchPoints = 0;

  }
}

export class Portland {
  constructor (den, sf){
    this.name = "Portland";
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [den, sf, ''];
    this.recentlyInfected = false;
  }
}
export class SanFransico {
  constructor (por, la){
    this.name = "San-Fransico";
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [por, la, ''];
    this.recentlyInfected = false;
  }
}
export class La {
  constructor (sf, dal){
    this.name = "LA";
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [sf, dal, ''];
    this.recentlyInfected = false;
  }
}
export class Dallas {
  constructor (den, la, atl){
    this.name = "Dallas";
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [den, la, atl];
    this.recentlyInfected = false;
  }
}
export class Denver {
  constructor (chi, dal, por){
    this.name = "Denver";
    this.cubes = 0;
    this.color = "Red";
    this.driveOption = [chi, dal, por];
    this.recentlyInfected = false;
  }
}
export class Chicago {
  constructor (den, bos, ny){
    this.name = "Chicago";
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [den, bos, ny];
    this.recentlyInfected = false;
  }
}
export class Ny {
  constructor (chi, bos){
    this.name = "NYC";
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [chi, bos, ''];
    this.recentlyInfected = false;
  }
}
export class Boston {
  constructor (chi, ny, atl){
    this.name = "Boston";
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [chi, ny, atl];
    this.recentlyInfected = false;
  }
}
export class Miami {
  constructor (atl, dal){
    this.name = "Miami";
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [atl, dal, ''];
    this.recentlyInfected = false;
  }
}
export class Atlanta {
  constructor (dal, mia, bos){
    this.name = "Atlanta";
    this.cubes = 0;
    this.color = "Green";
    this.driveOption = [dal, mia, bos];
    this.recentlyInfected = false;
    this.isResearch = true;
  }
}



Game.prototype.useEventCard = function () {
  if (this.eventCard === "jetCard"){
    this.flightOptions = [Portland, SanFransico, La, Dallas, Denver, Chicago, Ny, Boston, Miami, Atlanta];
    this.eventCard = "";
  }else if (this.eventCard === "adrenelineCard"){
    this.actionsLeft ++;
    this.eventCard = "";
  }
};


Game.prototype.move = function (clickedCity) {
// Clicked city is determined in the front end drop down
  this.playerCity = clickedCity;
  this.actionsLeft --;
};

Game.prototype.pass = function () {
  this.actionsLeft = 0;
};

Game.prototype.pickDiseaseCity = function() {
  let i =  Math.floor(Math.random() * 10);
  this.cities[i].cubes = 4;
  this.cities[i].recentlyInfected = true;
};

Game.prototype.removeCube = function() {
  if (this.playerCity.cubes > 0) {
    if ((this.playerCity.color === "Red") && (this.isRedCured === true)){
      this.playerCity.cubes = 0;

    }
    else if ((this.playerCity.color === "Green") && (this.isGreenCured === true)) {
      this.playerCity.cubes = 0;


    } else {
      this.playerCity.cubes --;


    }
    this.actionsLeft --;
  }
};

Game.prototype.startGame = function (game){

  game.pickDiseaseCity();
  game.pickDiseaseCity();
  game.pickDiseaseCity();
  game.pickDiseaseCity();
  let randomCity1 =  Math.floor(Math.random() * 10);
  let randomCity2 =  Math.floor(Math.random() * 10);
  let randomEventCard =  Math.floor(Math.random() * 2);
  this.eventCard = this.eventCards[randomEventCard];
  this.cityCards = [this.cities[randomCity1], this.cities[randomCity2]];
  this.flightOptions = this.cityCards;

};
Game.prototype.roundEnd = function (game) {
  game.pickDiseaseCity();
  this.actionsLeft = 2;
  if ((this.cityCards[0] === '') && (this.cityCards[1] == '')) {
    let randomCity1 =  Math.floor(Math.random() * 10);
    let randomCity2 =  Math.floor(Math.random() * 10);
    this.cityCards = [this.cities[randomCity1], this.cities[randomCity2]];
  }else if (this.cityCards[0] === ''){
    let randomCity1 =  Math.floor(Math.random() * 10);
    this.cityCards.splice(0, 1, this.cities[randomCity1]);
  } else if (this.cityCards[1] == ''){
    let randomCity1 =  Math.floor(Math.random() * 10);
    this.cityCards.splice(1, 1, this.cities[randomCity1]);
  }

  console.log(game.cityCards);
  this.flightOptions = this.cityCards;

};
