Alerts = (function(){

    var _collection = new Meteor.Collection(null);

    var __options = {
        reset : true,
        css : {
            "error": "alert-danger",
            "success": "alert-success",
            "info": "alert-info",
            "warning": "alert-warning"
        }
    };

    var clearAll = function(container) {
        if(container) {
            _collection.remove({container: container, seen: true});
        } else {
            _collection.remove({seen: true});
        }
    };

    var __throw = function(message, type, container) {
        var cssClass = ( __options.css[type] ? __options.css[type] : "" );

        if(container) {
            _collection.insert({
                message: message,
                seen: false,
                container: container,
                class: cssClass
            });
        } else {
            _collection.insert({
                message: message,
                seen: false,
                class: cssClass
            });
        }
    };

    var _throw = function(message, type, container, reset) {
        if(!message) return;

        if(!type) type = "error";

        if(reset || (typeof reset === "undefined" && __options.reset)) clearAll(container);

        __throw(message, type, container);
    };

    var _success = function(message, container) {
        _throw(message, "success", container);
    };

    var _info = function(message, container) {
        _throw(message, "info", container);
    };

    var _warning = function(message, container) {
        _throw(message, "warning", container);
    };

    var _error = function(message, container) {
        _throw(message, "error", container);
    };

    var _configure = function(options) {
        __options = $.extend(true, __options, options);
    };

    return {
        collection: _collection,
        throw: _throw,
        clear: clearAll,
        success: _success,
        info: _info,
        warning: _warning,
        error: _error,
        configure: _configure
    };

})();
