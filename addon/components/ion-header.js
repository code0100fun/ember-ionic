import Ember from 'ember';
import layout from '../templates/components/ion-header';

export default Ember.GlimmerComponent.extend({
  layout,
  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    if (kind) {
      return `bar-${this.get('kind')}`;
    }
  })
});
