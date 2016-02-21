export default Ember.Helper.helper(function(params, namedArgs) {
  return new Ember.Handlebars.SafeString("height:"+params[0]+"px\;");
});
