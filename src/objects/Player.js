import BasePerson from './BasePerson';

export default class Player extends BasePerson {

  constructor(game, x, y) {
    super(game, x, y, 'player');
  }

}
