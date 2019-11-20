import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Game, Dallas, Portland, La, SanFransico, Denver, Chicago, Ny, Boston, Miami, Atlanta } from './../src/backend.js';

const showCard  = (game) => {
  let card1 = (game.cityCards[0].name);
  let card2 = game.cityCards[1].name;
  let eventCard = game.eventCard;
  $("#cityCard1").html(card1);
  $("#cityCard2").html(card2);
  $("#eventCard").html(eventCard);
};
let gameEnd = function (game) {
  game.checkWinLoss();
  if (game.didYouWin === true) {
  $("#winDiv").show();
  apiWinLoss("happy");


  }else if (game.didYouLose === true)
    $("#lossDiv").show();
    apiWinLoss("sad");
};
let checkRoundEnd = function(game){
  console.log(game.didYouWin);
  console.log(game.didYouLose);
  $("#researchOptions").hide();
  if(game.actionsLeft === 0){
    $("#allGameButtonsRow").hide();
    gameEnd(game);
    console.log("round end");
    game.roundEnd(game);
    $("#actionCounter").html(game.actionsLeft);
    showCard(game);
    let timer = 1000;
    for(let i=0; i<game.cities.length; i++){
      timer += 400;
      setTimeout(function(){
        if (game.cities[i].recentlyInfected === true){
          $("#diseaseDisplay").text(game.cities[i].name);
          $("#" + game.cities[i].name).text(game.cities[i].cubes + " Cubes");
          game.cities[i].recentlyInfected = false;
        }
      }, timer);
    }
  }
  $("#allGameButtonsRow").show();
};


let apiWinLoss = function(searchTermWinLoss) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.API_KEY}&s=${searchTermWinLoss}`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();

  const getElements = function(response) {
    $("#imageWinLoss").attr("src", response.data.images.original.url);
  };
};


$(document).ready(function () {
  let searchTerm = "city";

  let api = function() {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.API_KEY}&s=${searchTerm}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $("#testGif").attr("src", response.data.images.original.url);
    };
  };
  let atl = new Atlanta ();
  let por = new Portland ();
  let la = new La ();
  let sf = new SanFransico ();
  let den = new Denver ();
  let dal = new Dallas ();
  let bos = new Boston ();
  let chi = new Chicago ();
  let mia = new Miami ();
  let ny = new Ny ();
  atl.driveOption = [dal, mia, bos];
  por.driveOption = [den, sf, ''];
  la.driveOption = [sf, dal, ''];
  sf.driveOption = [por, la, ''];
  den.driveOption = [chi,dal,por];
  dal.driveOption = [den,la,atl];
  bos.driveOption= [chi, ny, atl];
  chi.driveOption = [den, bos, ny];
  mia.driveOption = [atl, dal, ''];
  ny.driveOption = [chi, bos, ''];
  let game = new Game (atl, por, la, sf, den, dal, chi, ny, bos, mia);
  let hasResearchStation = (game) => {
    if(game.playerCity.isResearch === true){
      $("#researchButton").show();
    } else {
      $("#researchButton").hide();
    }
  }
  let locationMoveUpdate = (game) => {
    $("#currentCitySpan").text(game.playerCity.name);
    $("#driveLocation1").html(game.playerCity.driveOption[0].name);
    $("#driveLocation2").html(game.playerCity.driveOption[1].name);
    $("#driveLocation3").html(game.playerCity.driveOption[2].name);
    $("#actionCounter").html(game.actionsLeft);
    hasResearchStation(game);
  };


  $("#start").click(function() {
    $("#gameAreaDiv").show();
    $("#idInsturctions").hide();
    game.startGame(game);
    searchTerm = `${game.playerCity.name}+buildings`;
    api();
    console.log(searchTerm);
    $("#currentCitySpan").text(game.playerCity.name);
    let timer = 1000;
    for(let i=0; i<game.cities.length; i++){
      timer += 400;
      setTimeout(function(){
        if (game.cities[i].recentlyInfected === true){
          $("#diseaseDisplay").text(game.cities[i].name);
          $("#" + game.cities[i].name).text(game.cities[i].cubes + " Cubes");
          game.cities[i].recentlyInfected = false;
        }
      }, timer);
    }

    showCard(game);
  });

  $("#drive").click(function(){
    $("#driveLocation1").html(game.playerCity.driveOption[0].name);
    $("#driveLocation2").html(game.playerCity.driveOption[1].name);
    $("#driveLocation3").html(game.playerCity.driveOption[2].name);
  });

  $("#driveLocation1").click(function(){
    game.playerCity = game.playerCity.driveOption[0];
    game.actionsLeft --;
    searchTerm = `${game.playerCity}`;
    api();
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });

  $("#driveLocation2").click(function(){
    game.playerCity = game.playerCity.driveOption[1];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });

  $("#driveLocation3").click(function(){
    game.playerCity = game.playerCity.driveOption[2];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });

  $("#flyButton").click(function(){
    console.log(game.flightOptions);
    $("#flightLocation1").text(game.flightOptions[0].name);
    $("#flightLocation2").text(game.flightOptions[1].name);
  });

  $("#flightLocation1").click(function(){
    game.playerCity = game.flightOptions[0];
    game.actionsLeft --;
    locationMoveUpdate(game);
    game.cityCards.splice(0, 1, "");
    console.log(game.cityCards);
    $("#cityCard1").text("");
    $("#cityCard2").text(game.cityCards[1].name);
    checkRoundEnd(game);

  });
  $("#flightLocation2").click(function(){
    game.playerCity = game.flightOptions[1];
    game.actionsLeft --;
    locationMoveUpdate(game);
    game.cityCards.splice(1, 1, "");
    console.log(game.cityCards);
    $("#cityCard1").text(game.cityCards[0].name);
    $("#cityCard2").text("");
    checkRoundEnd(game);
  });
  $("#flightLocation3").click(function(){
    game.playerCity = game.flightOptions[2];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });
  $("#flightLocation4").click(function(){
    game.playerCity = game.flightOptions[3];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });
  $("#flightLocation5").click(function(){
    game.playerCity = game.flightOptions[4];
    game.actionsLeft --;
    locationMoveUpdate(game);
  });
  $("#flightLocation6").click(function(){
    game.playerCity = game.flightOptions[5];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });
  $("#flightLocation7").click(function(){
    game.playerCity = game.flightOptions[6];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });
  $("#flightLocation8").click(function(){
    game.playerCity = game.flightOptions[7];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });
  $("#flightLocation9").click(function(){
    game.playerCity = game.flightOptions[8];
    game.actionsLeft --;
    locationMoveUpdate(game);
  });
  $("#flightLocation10").click(function(){
    game.playerCity = game.flightOptions[9];
    game.actionsLeft --;
    locationMoveUpdate(game);
    checkRoundEnd(game);
  });


  $("#removeCubeButton").click(function(){
    game.removeCube();
    $("#actionCounter").html(game.actionsLeft);
    $("#" + game.playerCity.name).text(game.playerCity.cubes + " Cubes");
    checkRoundEnd(game);
  });

  $("#researchButton").click(function(){
    $("#researchOptions").show();
    $("#researchCard1").text(game.cityCards[0].name);
    $("#researchCard2").text(game.cityCards[1].name);
  });
  $("#researchCard1").click(function(){
    if (game.cityCards[0].color === "Red") {
      game.cityCards.splice(0, 1, "");
      game.redReasearchPoints ++;
      $("#redResearchPoints").html(game.redReasearchPoints);
      game.actionsLeft --,
      $("#actionCounter").html(game.actionsLeft);
      console.log(game.cityCards);
      $("#cityCard1").text("");
      $("#cityCard2").text(game.cityCards[1].name);
    } else if(game.cityCards[0].color === "Green"){
      game.cityCards.splice(0, 1, "");
      game.greenResearchPoints ++;
      $("#greenResearchPoints").html(game.greenResearchPoints);
      console.log(game.cityCards);
      $("#cityCard1").text("");
      $("#cityCard2").text(game.cityCards[1].name);
      game.actionsLeft --;
      $("#actionCounter").html(game.actionsLeft);
    }
    game.isResearchCompleted();
    checkRoundEnd(game);
  });
  $("#researchCard2").click(function(){
    if (game.cityCards[1].color === "Red") {
      game.cityCards.splice(1, 1, "");
      game.redReasearchPoints ++;
      $("#redResearchPoints").html(game.redReasearchPoints);
      game.actionsLeft --,
      $("#actionCounter").html(game.actionsLeft);
      console.log(game.cityCards);
      $("#cityCard1").text(game.cityCards[0].name);
      $("#cityCard2").text("");
    } else if(game.cityCards[1].color === "Green"){
      game.cityCards.splice(1, 1, "");
      game.greenResearchPoints ++;
      $("#greenResearchPoints").html(game.greenResearchPoints);
      console.log(game.cityCards);
      $("#cityCard1").text(game.cityCards[0].name);
      $("#cityCard2").text("");
      game.actionsLeft --;
      $("#actionCounter").html(game.actionsLeft);
    }
    game.isResearchCompleted();
    checkRoundEnd(game);
  });


});
