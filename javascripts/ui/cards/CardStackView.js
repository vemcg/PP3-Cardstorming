define(['cards/CardView', 'core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery'],
    function (Card, dispatcher, getUniqueId, logger) { "use strict"
        var CardStackView = (function () {

            function CardStackView () {

                // cardStackAttributes are the color and the purpose
                //  they come from ProjectView's passing of 
                function createCardStack(cardStackAttributes) {
                    require(['text!templates/cardStack.html'],
                        function(html) {
                            var csid = cardStackAttributes.styling;
                            cardStackAttributes.target = "#" + csid;

                            $('#palette').append(html);
                            var stack = $('#palette .cardStack#TBD');
                            stack.attr('id', csid);

                            // purpose is the category of the card.  
                            //   each card stack has its own purpose 
                            //     (the color parameter may also be used to visually distinguish card stacks)
                            $('.purpose', stack).html(cardStackAttributes.purpose);
                            
                            stack.addClass(csid);
                            stack.attr('id', csid);
							
                            // Put a card in it
                            // the card comes from the event
                            // createCard
                            dispatcher.fire('createCard', cardStackAttributes);
                        }
                    );
                }

                function addCardToCardStack(cardStackAttributes) {
                    require(['text!templates/cardStack.html'],
                        function(html) {
                            var csid = cardStackAttributes.styling;
                            cardStackAttributes.target = "#" + csid;

                            // TODO: Put a card in it
                            // TODO: Later, take the card from the event rather than directly
                            dispatcher.fire('createCard', cardStackAttributes);
                        }
                    );
                }
                
                // IN DEVELOPMENT
                //  gets all the classes from a card
                //   used by replaceCard, for example, so we can isolate 
                //   an attribute of the card and determine the style from it
                //  --> move to CardView, as this pertains to a particular card, not 
                //  to the stack of a card
                //  author:  Vern
                function extractStylingClass(classes) {
                    for (var i = 0; i < classes.length; i++) {
                        var style = classes[i];
                        if (-1 < style.indexOf('Card')) {
                            return (style);
                        }
                    }
                    return ('NotFound');
                }
                
                // IN DEVELOPMENT
                //  --> move to CardView, as this pertains to a particular card, not 
                //  to the stack of a card
                //  calls extractStylingClass
                //  unknown usefulness
                //  author:  Vern
                function replaceCard(cardId) {
                    var card = $('#palette #' + cardId);
                    card.removeClass('blankCard');
                    var cardStackAttributes = {};
                    cardStackAttributes.styling = extractStylingClass(card[0].classList);
                    cardStackAttributes.target = '#' + cardStackAttributes.styling;
                    dispatcher.fire('createCard', cardStackAttributes);
                }


                function init() {
                    dispatcher.on('createCardStack', createCardStack);
					dispatcher.on('addCardToCardStack', addCardToCardStack);
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