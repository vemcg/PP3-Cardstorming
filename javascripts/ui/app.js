define(['banner/BannerView', 'palette/PaletteView', 'projectView/ProjectView', 'core/EventDispatcher','jquery'],
function (banner, palette, projectView, eventDispatcher) { "use strict"
    var App = (function () {

        function App () {

            function init() {
                // eventDispatcher.fire('set some breakpoints');
                banner.init();
                projectView.init();
                palette.init();
            }

            // Public Interface
            this.init = init;
        }   // End of Instance
        return App;
    } ()); // End of Class

    // Choose either:
    return new App(); // Returns an instance of App (a singleton)
    // return App; // Returns App (a Constructor for multiple instances)
});
