define(['jquery'],
    function () { "use strict"
        var BannerView = (function () {

            function BannerView () {

                function pause () {

                }
                function resume () {

                }

                function init() {
                   // alert("This is the init() of banner.");
                }

                // Public Interface
                this.pause = pause;
                this.resume = resume;
                this.init = init;
            }   // End of BannerViewInstance
            return BannerView;
        } ()); // End of BannerViewClass

        return new BannerView(); // Returns and instance of SampleInstance (a singleton)
        // return SampleInstance; // Returns SampleInstance (a Constructor for multiple instances)
    });
