define([], function() {
    function doNothing() {}

    var noLog = {
        log : doNothing,
        info : doNothing,
        warn : doNothing,
        error : doNothing
    };

    return window.console ? window.console : noLog;
});