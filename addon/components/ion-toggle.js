import Ember from 'ember';
import layout from '../templates/components/ion-toggle';

export default Ember.GlimmerComponent.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['item', 'item-toggle', 'toggle-large'],

  checked: null
});
