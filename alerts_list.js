Template.alerts.helpers({
  alerts: function() {
    var container = this.container;
    if(container) {
      return Alerts.collection.find({
        container: container
      });
    } else {
      return Alerts.collection.find();
    }
  }
});

Template.alertItem.rendered = function() {
  var alert = this.data;
  Meteor.defer(function() {
    Alerts.collection.update(alert._id, {$set: {seen: true}});
  });
};
