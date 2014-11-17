define(['cards/CardStackView', 'cards/CardView', 'core/EventDispatcher', 'jquery'],
    function (CardStack, Card, dispatcher) { "use strict"
        var PaletteView = (function () {

            function PaletteView () {

                var palette;

                function pause () {}
                function resume () {}

                function init() {
                    // Fake button push
                    var demoCardStackAttributes = {
                        purpose : 'Yellow Bird!',
                        styling : 'yellowCard'
                    };
                    dispatcher.fire('getNewCardStack', demoCardStackAttributes);
                    
                    demoCardStackAttributes = {
                        purpose : 'I should be purple',
                        styling : 'purpleCard'
                    };
                    dispatcher.fire('getNewCardStack', demoCardStackAttributes);
                    
                    demoCardStackAttributes = {
                        purpose : 'I should be green',
                        styling : 'greenCard'
                    };
                    dispatcher.fire('getNewCardStack', demoCardStackAttributes);
                }

                // Public Interface
                this.pause = pause;
                this.resume = resume;
                this.init = init;
            }   // End of Instance
            return PaletteView;
        } ()); // End of Class

        return new PaletteView();
    }
);
