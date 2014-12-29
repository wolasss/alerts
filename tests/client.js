Tinytest.add("Alerts - Alerts collection works", function(test) {
    test.equal(Alerts.collection.find({}).count(), 0);

    Alerts.throw('A new error!');
    test.equal(Alerts.collection.find({}).count(), 1);

    Alerts.collection.remove({});
});

Tinytest.add("Alerts - Alerts global throw works", function(test) {
    test.equal(Alerts.collection.find({}).count(), 0);

    Alerts.throw('A new error!', 'error', null, false);
    test.equal(Alerts.collection.find({}).count(), 1);

    Alerts.throw('A new error two!', 'error', null, false);
    test.equal(Alerts.collection.find({}).count(), 2);

    Alerts.throw('A new error with reset!', 'error', null, true); //no reset cause it was not rendered, hence not seen
    test.equal(Alerts.collection.find({}).count(), 3);

    Alerts.success('A new success!');
    test.equal(Alerts.collection.find({}).count(), 4);

    Alerts.info('A new info!');
    test.equal(Alerts.collection.find({}).count(), 5);

    Alerts.error('A new error!');
    test.equal(Alerts.collection.find({}).count(), 6);

    Alerts.warning('A new warning!');
    test.equal(Alerts.collection.find({}).count(), 7);

    Alerts.collection.remove({});
});

Tinytest.add("Alerts - Alerts container throw works", function(test) {
    test.equal(Alerts.collection.find({}).count(), 0);

    var container = "testcontainer";

    Alerts.throw('A new error!', 'error', container, false);
    test.equal(Alerts.collection.find({container: container}).count(), 1);

    Alerts.throw('A new error!', 'error', container, false);
    test.equal(Alerts.collection.find({container: container}).count(), 2);

    Alerts.throw('A new error!', 'error', container, true);
    test.equal(Alerts.collection.find({container: container}).count(), 3);

    Alerts.throw('A new global error!', 'error', null, true);
    test.equal(Alerts.collection.find({container: container}).count(), 3);

    Alerts.success('A new success!', container);
    test.equal(Alerts.collection.find({container: container}).count(), 4);

    Alerts.info('A new info!', container);
    test.equal(Alerts.collection.find({container: container}).count(), 5);

    Alerts.error('A new error!', container);
    test.equal(Alerts.collection.find({container: container}).count(), 6);

    Alerts.warning('A new warning!', container);
    test.equal(Alerts.collection.find({container: container}).count(), 7);

    Alerts.collection.remove({});
});


Tinytest.addAsync("Alerts - Alerts render global alert - default", function(test, done) {
    
    Alerts.throw('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-danger'), true);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render global alert - error", function(test, done) {
    
    Alerts.error('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-danger'), true);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render global alert - success", function(test, done) {
    
    Alerts.success('A new success!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-success'), true);

        Alerts.collection.remove({});
        done();
    }, 100);
});


Tinytest.addAsync("Alerts - Alerts render global alert - warning", function(test, done) {
    
    Alerts.warning('A new warning!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-warning'), true);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render global alert - info", function(test, done) {
    
    Alerts.info('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-info'), true);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render container alert - default", function(test, done) {
    Alerts.collection.remove({});
    var container = "test";

    Alerts.throw('A new error!', "error", container);
    test.equal(Alerts.collection.find({container: container,seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 0);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 1);
        test.equal(Alerts.collection.find({container: container}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-danger'), true);

        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts render container alert - error", function(test, done) {
    Alerts.collection.remove({});
    var container = "test";

    Alerts.error('A new error!', container);
    test.equal(Alerts.collection.find({container: container,seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 0);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 1);
        test.equal(Alerts.collection.find({container: container}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-danger'), true);

        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts render container alert - warning", function(test, done) {
    Alerts.collection.remove({});
    var container = "test";

    Alerts.warning('A new warning!', container);
    test.equal(Alerts.collection.find({container: container,seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 0);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 1);
        test.equal(Alerts.collection.find({container: container}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-warning'), true);

        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts render container alert - success", function(test, done) {
    Alerts.collection.remove({});
    var container = "test";

    Alerts.success('A new success!', container);
    test.equal(Alerts.collection.find({container: container,seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 0);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 1);
        test.equal(Alerts.collection.find({container: container}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-success'), true);

        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts render container alert - info", function(test, done) {
    Alerts.collection.remove({});
    var container = "test";

    Alerts.info('A new info!', container);
    test.equal(Alerts.collection.find({container: container,seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 0);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 1);
        test.equal(Alerts.collection.find({container: container}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-info'), true);

        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts render global alert with reset - default", function(test, done) {
    /* default behaviour if not specified is to clean seen alerts when throwing new one */
    Alerts.throw('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    Alerts.throw('A new error - second!');
    test.equal(Alerts.collection.find({seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: true}).count(), 2);
        Alerts.throw('A new error - second!');
        test.equal(Alerts.collection.find({seen: false}).count(), 1);
        test.equal(Alerts.collection.find({seen: true}).count(), 0);
        test.equal($(rendered).find('.alert').length, 1);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render global alert with reset - no reset", function(test, done) {
    Alerts.throw('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    Alerts.throw('A new error - second!');
    test.equal(Alerts.collection.find({seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: true}).count(), 2);
        Alerts.throw('A new error - second!', "error", null, false);
        test.equal(Alerts.collection.find({seen: false}).count(), 1);
        test.equal(Alerts.collection.find({seen: true}).count(), 2);
        test.equal($(rendered).find('.alert').length, 3);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render global alert with reset - reset", function(test, done) {
    Alerts.throw('A new error!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    Alerts.throw('A new error - second!');
    test.equal(Alerts.collection.find({seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: true}).count(), 2);
        Alerts.throw('A new error - second!', "error", null, true);
        test.equal(Alerts.collection.find({seen: false}).count(), 1);
        test.equal(Alerts.collection.find({seen: true}).count(), 0);
        test.equal($(rendered).find('.alert').length, 1);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render container alert with reset - default", function(test, done) {
    /* default behaviour if not specified is to clean seen alerts when throwing new one */
    var container = "test";
    Alerts.error('A new error!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);

    Alerts.error('A new error - second!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 2);
        Alerts.error('A new error - second!', container);
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 0);
        test.equal($(rendered).find('.alert').length, 1);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render container alert with reset - reset", function(test, done) {
    var container = "test";
    Alerts.error('A new error!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);

    Alerts.error('A new error - second!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 2);
        Alerts.throw('A new error - second!', 'error', container, true);
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 0);
        test.equal($(rendered).find('.alert').length, 1);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts render container alert with reset - no reset", function(test, done) {
    var container = "test";
    Alerts.error('A new error!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);

    Alerts.error('A new error - second!', container);
    test.equal(Alerts.collection.find({container: container, seen: false}).count(), 2);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl, {container: container});

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 2);
        Alerts.throw('A new error - second!', 'error', container, false);
        test.equal(Alerts.collection.find({container: container, seen: false}).count(), 1);
        test.equal(Alerts.collection.find({container: container, seen: true}).count(), 2);
        test.equal($(rendered).find('.alert').length, 3);

        Alerts.collection.remove({});
        done();
    }, 100);
});

Tinytest.addAsync("Alerts - Alerts configuration - different css class", function(test, done) {
    
    Alerts.configure({
        css: {
            info: 'alert-infotest'
        }
    });

    Alerts.info('A new info!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);
        test.equal($(rendered).find('.alert').hasClass('alert-infotest'), true);

        Alerts.error('A new error!'); // with reset - default behaviour
        test.equal($(rendered).find('.alert').hasClass('alert-danger'), true);

        Alerts.success('A new success!'); // with reset - default behaviour
        test.equal($(rendered).find('.alert').hasClass('alert-success'), true);

        Alerts.warning('A new warning!'); // with reset - default behaviour
        test.equal($(rendered).find('.alert').hasClass('alert-warning'), true);

        Alerts.info('A new info!'); // with reset - default behaviour
        test.equal($(rendered).find('.alert').hasClass('alert-infotest'), true);


        Alerts.collection.remove({});
        done();
    }, 100);

});

Tinytest.addAsync("Alerts - Alerts configuration - custom reset behaviour", function(test, done) {
    
    Alerts.configure({
        reset: false
    });

    Alerts.info('A new info!');
    test.equal(Alerts.collection.find({seen: false}).count(), 1);

    var tpl = Template.alerts;
    var rendered = renderToDiv(tpl);

    Meteor.setTimeout(function() {
        test.equal(Alerts.collection.find({seen: false}).count(), 0);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal(Alerts.collection.find({}).count(), 1);

        Alerts.error('A new error!'); // with reset - default behaviour
        test.equal(Alerts.collection.find({seen: false}).count(), 1);
        test.equal(Alerts.collection.find({seen: true}).count(), 1);
        test.equal($(rendered).find('.alert').length, 2);

        Alerts.collection.remove({});
        done();
    }, 100);

});
