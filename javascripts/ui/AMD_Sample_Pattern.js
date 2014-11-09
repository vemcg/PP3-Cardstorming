define(['path/to/xxx','path/to/yyy','jquery'],
    function (xxx, yyy,$) { "use strict"
        var Sample = (function () {
            var CLASS_CONSTANT = 42;
            var classVariable = 84;

            function Sample () {
                var publicInstanceMethod;
                var privateInstanceVariable;

                function privateMethod () {

                }
                function publicMethod () {

                }

                function init() {

                }

                // Public Interface
                this.publicVariable = publicVariable;
                this.publicMethod = publicMethod;
                this.init = init;
            }   // End of Instance
            return Sample;
        } ()); // End of Class

        // Choose either:
        // return new Sample(); // Returns an instance (a singleton)
        // return Sample; // Returns a Constructor for multiple instances
    });