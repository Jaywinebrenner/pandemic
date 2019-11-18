import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Game, Dallas, Portland, La, SanFransico, Denver, Chicago, Ny, Boston, Miami, Atlanta, eventCards } from './../src/backend.js';




$(document).ready(function () {
  $("#start").click(function() {
    let atl = new Atlanta ();
    let por = new Portland ();
    let la = new La ();
    let sf = new SanFransico ();
    let den = new Denver ();
    let dal = new Dallas ();
    let chi = new Chicago ();
    let ny = new Ny ();
    let bos = new Boston ();
    let mia = new Miami();
    let game = new Game(atl, por, la, sf, den, dal, chi, ny, bos, mia);
    game.startGame(game);
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
});
