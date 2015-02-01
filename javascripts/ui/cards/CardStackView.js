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

                            // $('.purpose', stack).html(cardStackAttributes.purpose);
                            // stack.text(cardStackAttributes.purpose);
                            
                            stack.addClass(csid);
                            stack.attr('id', csid);

                            // TODO: Put a card in it
                            // TODO: Later, take the card from the event rather than directly
                            // debugger;
                            dispatcher.fire('getNewCard', cardStackAttributes);

                            stack.text(cardStackAttributes.purpose);
                        }
                    );
                }

                function extractStylingClass(classes) {
                    for (var i = 0; i < classes.length; i++) {
                        var style = classes[i];
                        if (-1 < style.indexOf('Card')) {
                            return (style);
                        }
                    }
                    return ('NotFound');
                }
                function replaceCard(cardId) {
                    var card = $('#palette #' + cardId);
                    card.removeClass('blankCard');
                    var cardStackAttributes = {};
                    cardStackAttributes.styling = extractStylingClass(card[0].classList);
                    cardStackAttributes.target = '#' + cardStackAttributes.styling;
                    dispatcher.fire('getNewCard', cardStackAttributes);
                }

                function init() {
                    dispatcher.on('getNewCardStack', createCardStack);
                    dispatcher.on('replaceCard', replaceCard);
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