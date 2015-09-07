import Ember from 'ember';

export default Ember.GlimmerComponent.extend({
  tagName: 'ion-content',
  classNames: ['scroll-content', 'overflow-scroll'], //  overflow-scroll
  classNameBindings: [
    'header:has-header',
    'footer:has-footer'
  ]
});
