import Ember from 'ember';
import layout from '../templates/components/ion-button';
import attrClassPrefix from '../helpers/attr-class-prefix';

const PREFIX_ATTRS = ['block', 'full', 'small', 'large', 'outline', 'clear'];

export default Ember.GlimmerComponent.extend({
  layout,

  styleClasses: attrClassPrefix('button-', PREFIX_ATTRS),

  kindClass: Ember.computed('attrs.kind', function() {
    let kind = this.get('attrs.kind');
    if (kind) {
      return `button-${kind}`;
    }
  })
});
