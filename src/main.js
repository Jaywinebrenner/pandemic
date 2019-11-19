import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Game, Dallas, Portland, La, SanFransico, Denver, Chicago, Ny, Boston, Miami, Atlanta } from './../src/backend.js';




$(document).ready(function () {
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
  sf.driveOption = [por, la, '']
  den.driveOption = [chi,dal,por];
  dal.driveOption = [den,la,atl];
  bos.driveOption= [chi, ny, atl];
  chi.driveOption = [den, bos, ny];
  mia.driveOption = [atl, dal, ''];
  ny.driveOption = [chi, bos, ''];
  let game = new Game (atl, por, la, sf, den, dal, chi, ny, bos, mia);

  let locationMoveUpdate = (game) => {
      $("#currentCitySpan").text(game.playerCity.name);
      $("#driveLocation1").html(game.playerCity.driveOption[0].name);
      $("#driveLocation2").html(game.playerCity.driveOption[1].name);
      $("#driveLocation3").html(game.playerCity.driveOption[2].name);
      $("#actionCounter").html(game.actionsLeft);
  }


  $("#start").click(function() {
    game.startGame(game);
    $("#currentCitySpan").text(game.playerCity.name);
    let timer = 1000
    for(let i=0; i<game.cities.length; i++){
      timer += 400;
      setTimeout(function(){
      if (game.cities[i].recentlyInfected === true){
          $("#diseaseDisplay").append(game.cities[i].name);
          $("#" + game.cities[i].name).text(game.cities[i].cubes + " Cubes")
          game.cities[i].recentlyInfected = false;
      }
    }, timer)
    }

    const showCard  = (game) => {
      let card1 = (game.cityCards[0].name);
      let card2 = game.cityCards[1].name;
      let eventCard = game.eventCard;
      $("#cityCard1").html(card1)
      $("#cityCard2").html(card2)
      $("#eventCard").html(eventCard)
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
        locationMoveUpdate(game);
    })

    $("#driveLocation2").click(function(){
        game.playerCity = game.playerCity.driveOption[1];
        game.actionsLeft --;
        locationMoveUpdate(game);
    })

    $("#driveLocation3").click(function(){
        game.playerCity = game.playerCity.driveOption[2];
        game.actionsLeft --;
        locationMoveUpdate(game);
    })

  $("#flyButton").click(function(){
    console.log(game.flightOptions);

    for (let i=0; i<game.flightOptions.length; i++){
      $("#flightOptions").append("<li>" + game.flightOptions[i].name + "</li>");
    }
  })



// we can find the drive city, but cant append it to the dom
});
