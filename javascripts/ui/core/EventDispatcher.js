define(['core/Log'],
    function (logger) { "use strict"
        var EventDispatcher = (function () {

            function EventDispatcher() {

                var LOG_LEVEL = 1;  // change this if you don't want logging functions
                var registeredEvents = {};

                function log (level, message) {
                    if (LOG_LEVEL <= level) {
                        logger.log (message);
                    }
                }

                function indexOf(list, item) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i] === item) return i;
                    }
                    return -1;
                }
                function remove(list, item) {
                    var i = indexOf(list, item);
                    if (-1 < i) {
                        list.splice(i, 1);
                    }
                }
                function append(list, item) {
                    list.push(item);
                }
                function on(eventName, callback) {
                    if (!registeredEvents.hasOwnProperty(eventName)) {
                        registeredEvents[eventName] = [];
                    }
                    remove(registeredEvents[eventName], callback);   // Callback can only be listed once ...
                    append(registeredEvents[eventName], callback);   // ... at the end of the list.
                }

                function off(eventName, callback) {
                    if (!registeredEvents.hasOwnProperty(eventName)) {
                        registeredEvents[eventName] = [];
                    }
                    remove(registeredEvents[eventName], callback);   // Remove callback if present
                }

                function fire(eventName, eventInfo) {
                    var i, n, list, json;

                    if (registeredEvents.hasOwnProperty(eventName)) {
                        list = registeredEvents[eventName];
                        n = list.length;

                        // LOGGING
                        // log how many callbacks are registered to the events which is being "fired"
                        //   as long as there is at least one callback associated
                        // this if block is for debugging purposes only
                        //  the first parameter of the log() method is the logging level
                        //  the logging level is controlled in EventDispatcher.js
                        if (0 < n) {
                            try {
                                json = JSON.stringify(eventInfo);
                            }
                            catch (e) {
                                json = e.message;
                            }
                            log(1, 'EVENTS: Firing ' + eventName + ' ' + json + ' (' + n + ' callbacks)');
                        }
                        // END LOGGING
                        
                        for (i = 0; i < n; i++) {
                            list[i](eventInfo);   // Call callbacks
                        }
                    } else {
                        log(1, 'EVENTS: No callbacks for ' + eventName);
                    }
                }

                // Public Interface
                this.on = on;
                this.off = off;
                this.fire = fire;
            }   // End of Instance
            return EventDispatcher;
        }()); // End of Class

        return new EventDispatcher();
    });