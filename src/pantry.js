class Pantry {
  constructor(pantry) {
    this.items = pantry || [];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
