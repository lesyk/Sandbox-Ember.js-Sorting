import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  wiki_page: DS.attr(),
  code: DS.attr()
});
