import Ember from 'ember';
import layout from '../templates/components/ion-option-button';

export default Ember.GlimmerComponent.extend({
  layout: layout,

  kindClass: Ember.computed('attrs.kind', function() {
    let kind = this.get('attrs.kind');
    let output = 'button';
    if (kind) {
      output += ` button-${kind}`;
    }
    return output;
  })
});
