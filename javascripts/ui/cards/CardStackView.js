define(['cards/CardView', 'core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery'],
    function (Card, dispatcher, getUniqueId, logger) { "use strict"
        var CardStackView = (function () {

            function CardStackView () {

                function createCardStack(cardStackAttributes) {
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

                function init() {
                    dispatcher.on('getNewCardStack', createCardStack);
                }

                init();

                // Public Interface
                this.init = init;
            }   // End of Instance
            return CardStackView;
        } ()); // End of Class

        // Choose either:
        return new CardStackView(); // Returns an instance (a singleton)
        // return CardStackView; // Returns a Constructor for multiple instances
    });