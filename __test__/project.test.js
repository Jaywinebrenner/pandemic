import { Game, Dallas, Portland, La, SanFransico, Denver, Chicago, Ny, Boston, Miami, Atlanta } from './../src/backend.js';

describe ('Move cities', () => {
  test('should change the city to the clicked city', () => {
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
    let clickedCity = dal
game.move(clickedCity);
expect(game.playerCity).toEqual(dal);
expect(game.actionsLeft).toEqual(1);
  });
});

// describe ('Add cubes', () =>  {
//   test('should pick a city and set cubes equal to 4', () => {
//     let atl = new Atlanta ();
//     let por = new Portland ();
//     let la = new La ();
//     let sf = new SanFransico ();
//     let den = new Denver ();
//     let dal = new Dallas ();
//     let chi = new Chicago ();
//     let ny = new Ny ();
//     let bos = new Boston ();
//     let mia = new Miami();
//     let game = new Game(atl, por, la, sf, den, dal, chi, ny, bos, mia);
//     // for testing purposes, we disabled random
//     game.pickDiseaseCity();
//     expect(atl.cubes).toEqual(4);
//   })
// })

describe ('remove cubes', () =>{
  test('should remove cube from city player is in', () => {
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
    game.removeCube();
    expect(por.cubes).toEqual(-1)
  })
})
