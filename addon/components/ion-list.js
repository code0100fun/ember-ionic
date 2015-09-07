import Ember from 'ember';
import layout from '../templates/components/ion-list';

export default Ember.GlimmerComponent.extend({
  layout,
  init() {
    this._super(...arguments);
    this._items = Ember.A([]);
  },

  registerItem(item) {
    let items = this._items;
    items.pushObject(item);
  }
});
