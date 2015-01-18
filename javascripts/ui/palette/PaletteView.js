define(['cards/CardStackView', 'cards/CardView', 'core/EventDispatcher', 'jquery'],
    function (CardStack, Card, dispatcher) { "use strict"
        var PaletteView = (function () {

            function PaletteView () {

                var palette;
/*
                function addCardStackToPalette(cardStackAttributes) {
                    var cardStack = new CardStack(cardStackAttributes);
                    $('#palette').append(cardStack.html);

                    function createCardStack(csa) {
                        cardStackAttributes = csa;
                        require(['text!templates/cardStack.html'],
                            function(html) {
                                var csid = cardStackAttributes.styling;
                                cardStackAttributes.target = "#" + csid;

                                $('#palette').append(html);
                                var stack = $('#palette .cardStack#TBD');
                                stack.attr('id', csid);

                                $('.purpose', stack).html(cardStackAttributes.purpose);

                                stack.addClass(csid);
                                stack.attr('id', csid);

                                // TODO: Put a card in it
                                // TODO: Later, take the card from the event rather than directly
                                dispatcher.fire('getNewCard', cardStackAttributes);
                            }
                        );
                    }
                }
 */
                function pause () {}
                function resume () {}

                function init() {
                    // Fake button push
                    var demoCardStackAttributes = {
                        purpose : 'Yellow Bird!',
                        styling : 'yellowCard'
                    };
                    dispatcher.fire('getNewCardStack', demoCardStackAttributes);
                    // addCardStackToPalette(demoCardStackAttributes);

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
