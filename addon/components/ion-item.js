import Ember from 'ember';
import IonList from './ion-list';
import layout from '../templates/components/ion-item';
import attrClassPrefix from '../helpers/attr-class-prefix';

const PREFIX_ATTRS = [
  'icon-left',
  'icon-right',
  'thumbnail-left',
  'thumbnail-right',
  'button-left',
  'button-right',
  'avatar',
  'remove-animate',
  'complex',
  'radio',
  'input',
  'checkbox',
  'select',
  'divider',
  'toggle',
  'remove-animate',
  'right-editable'
];

export default Ember.GlimmerComponent.extend({
  layout,

  section: {
    link:    { link: true},
    content: { content: true},
    options: { options: true}
  },

  _link: Ember.computed('attrs.type', function() {
    return this.get('attrs.type') !== 'radio';
  }),

  _label: Ember.computed('attrs.type', function() {
    return this.get('attrs.type') === 'radio';
  }),

  typeClass: Ember.computed('attrs.type', function() {
    const type = this.get('attrs.type');
    if (type) {
      return `item-${this.get('attrs.type')}`;
    }
  }),

  styleClasses: attrClassPrefix('item-', PREFIX_ATTRS),

  init() {
    this._super(...arguments);
    this._optionButtons = Ember.A([]);
    let ionList = this.nearestOfType(IonList);
    ionList && ionList.registerItem(this);
  },

  _previousX: 0,
  _translateX: 0,
  _screenWidth: 0,
  _translateSpeed: 0,
  _open: false,
  _optionVisibilityClass: 'invisible',

  _registerOptionButton(button) {
    this.get('_optionButtons').pushObject(button);
  },

  _transformOutput: Ember.computed('_translateX', '_translateSpeed', function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(`
      transform: translate(${escape(this.get('_translateX'))}px, 0px);
      transition: transform ${escape(this.get('_translateSpeed'))}s;
      -webkit-transform: translate(${escape(this.get('_translateX'))}px, 0px);
      -webkit-transition: -webkit-transform ${escape(this.get('_translateSpeed'))}s;
    `);
  }),

  didInsertElement() {
    if (this.attrs['right-editable']) {
      let { width } = this.element.getBoundingClientRect();
      let hammer = new Hammer(this.element);
      let slidingLink = this.element.querySelector(".item-content");

      this._screenWidth = width;

      hammer.on('pan', event => this._pan(event) );
      hammer.on('panend', event => this._panEnd(event) );

      slidingLink.addEventListener("transitionend", () => {
        if (!this._open) {
          this.set('_optionVisibilityClass', 'invisible');
        }
        this.set('_translateSpeed', 0);
      });
    }
  },

  _pan(event) {
    event.preventDefault();
    Ember.run(() => {
      this._slideItem(event);
    });
  },

  _panEnd(event) {
    event.preventDefault();
    Ember.run(() => {
      this._finishSlidingItem(event);
    });
  },

  _slideItem(event) {
    let offset;
    if (!this._previousX) {
      this.set('_optionVisibilityClass', '');
      offset = this._previousX = event.deltaX;
    } else {
      offset = event.deltaX - this._previousX;
      this._previousX = event.deltaX;
    }
    this._applyTranslate(offset);
  },

  _applyTranslate(offset) {
    const MAX_SLIDE_LEFT_SCREEN_RATIO = 0.7;
    let withinRightMax = (this._translateX + offset) <= 0;
    let withinLeftMax = (this._translateX + offset) >= (this._screenWidth * -MAX_SLIDE_LEFT_SCREEN_RATIO);
    if (withinRightMax && withinLeftMax) {
      this.set('_translateX', this._translateX + offset);
    }
  },

  _finishSlidingItem() {
    const ITEM_TRANSLATE_SPEED = 0.4;
    let optionsWidth = this.element.querySelector(".item-options").offsetWidth;
    this.set('_translateSpeed', ITEM_TRANSLATE_SPEED);
    if (this._translateX < -optionsWidth) {
      this._open = true;
      this.set('_translateX', -optionsWidth);
    } else {
      this._open = false;
      this.set('_translateX', 0);
    }

    this._previousX = 0;
  }
});
