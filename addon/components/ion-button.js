import Ember from 'ember';
import layout from '../templates/components/ion-button';

const STYLE_TYPES = ['block', 'full', 'small', 'large', 'outline', 'clear'];
const STYLE_TYPE_PATHS = STYLE_TYPES.map((key) => `attrs.${key}`);

export default Ember.GlimmerComponent.extend({
  layout,

  styleClasses: Ember.computed.apply(null, STYLE_TYPE_PATHS.concat(function() {
    return STYLE_TYPES.map((key) => {
      const value = this.get(`attrs.${key}`);
      return typeof(value) === 'undefined' || value === 'false' ? '' : `button-${key}`;
    }).join(' ');
  })),

  kindClass: Ember.computed('attrs.kind', function() {
    let kind = this.get('attrs.kind');
    if (kind) {
      return `button-${kind}`;
    }
  })
});
