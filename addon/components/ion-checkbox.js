import Ember from 'ember';
import layout from '../templates/components/ion-checkbox';

export default Ember.GlimmerComponent.extend({
  layout: layout, 
  tagName: 'label',
  classNames: ['item', 'item-checkbox'],

  checked: null
});
