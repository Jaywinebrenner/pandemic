import { Game, Dallas } from './../src/backend.js';

describe ('Move cities', () => {
  test('should change the city to the clicked city', () => {
let game = new Game ();
let clickedCity = Dallas;
game.drive(clickedCity);
expect(game.playerCity).toEqual(Dallas);

  });
});
