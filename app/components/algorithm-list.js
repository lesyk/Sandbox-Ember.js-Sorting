import Ember from 'ember';

export default Ember.Component.extend({
  selected: null,

  actions: {
    select(algorithm) {
      this.set("selected", algorithm);
    },
  }
});
