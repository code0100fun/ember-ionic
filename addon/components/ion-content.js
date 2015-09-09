import Ember from 'ember';
import layout from '../templates/components/ion-content';
import attrClassPrefix from '../helpers/attr-class-prefix';

export default Ember.GlimmerComponent.extend({
  layout,

  styleClasses: attrClassPrefix('', ['padding'])
});
