import Ember from 'ember';

export default function attrClassPrefix(prefix, keys) {
  const paths = keys.map((key) => `attrs.${key}`);
  return Ember.computed.apply(null, paths.concat(function() {
    return keys.map((key) => {
      const value = this.get(`attrs.${key}`);
      return typeof(value) === 'undefined' || value === 'false' ? '' : `${prefix}${key}`;
    }).join(' ');
  }));
}
