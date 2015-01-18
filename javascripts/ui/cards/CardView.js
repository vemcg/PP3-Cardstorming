define(['core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery', 'jqueryUI'],
    function (dispatcher, uniqueId, logger) { "use strict"
        var CardView = (function () {

            function CardView () {

                function createCard(cardAttributes) {
                    require(['text!templates/blankCard.html'],
                        function(html) {
                        
                        /*
                          when click on a card stack, we know which card stack was clicked on
                          in card attribute, make position be the same as the card stack:  x, y, z is the maximum value
                              that puts that card on top of anything else in the view
                          when we drag and drop inside the project view   
                               we can compute the x and y from where we are in the project view (absolute positioning)
                               of the project board under it is.  that allows us to set x and y
                               
                               thoughts for collaborative app:  need to solve problem of more than one personal
                                   creating a card and trying to place it in the same location
                                   (idea) call server:  z then is the highest the z yet seen -- 1+ the largest z on the projectBoard
                          
                        */


                            $(cardAttributes.target).append(html);

                            var cid = uniqueId.create('card-');
                            var card = $('#TBD');
                            $('#TBD').attr('id', cid);
                            card = $('#' + cid);
                            dispatcher.on('dblclick', idAndEditCard);

                            if ('#projectBoard' == cardAttributes.target) {
                                debugger; // ever getting called.
                                card.css('top', '' + cardAttributes.y + 'em');
                                card.css('left', '' + cardAttributes.x + 'em');
                                card.css('z-index', cardAttributes.z);
                                card.removeClass('blankCard');
                            } else {
                                card.css('position', 'relative');
                                card.css('left', '0px');
                                card.css('top', '0px');
                                card.css('z-index', 1);
                            }

                            // $('.creator', cid).html(cardAttributes.creator);
                            $('.title', card).html(cid); // later cardAttributes.title);
                            $('.content', card).html(cardAttributes.content);

                            card.removeClass('hidden');
                            card.addClass(cardAttributes.styling);
                            card.draggable();

                            // card.draggable();

                            // cardAttributes.cid = cid;
                            // dispatcher.fire('cardAdded'); needed
                        }
                    );
                }
/*
                function addCardToStack (cardAttributes) {
                    var csid = '#' + cardAttributes.purpose;
                    var card = $('#detachableAssets .cardAsset .blankCard').html();
                    var cid = Card.getUniqueCardId();
                    $("body").append(card);
                    $('.blankCard.hidden').attr('id', cid);
                    cid = '#' + cid;
                    $(cid).attr('position adsolute');
                    $(cid).attr('z-index', Card.maxZ);
                    $(cid).attr('top', $(csid).attr('top'));
                    $(cid).attr('left', $(csid).attr('left'));
                    $(cid).removeClass('hidden');
                    $('.card').draggable();
                }
*/
                function editCard(cardId) {
                    debugger;
                }
                function idAndEditCard(event) {
                    var cardId = event.target.firstChild.parentElement.offsetParent.id;
                    editCard(cardId);
                }

                function init() {
                    dispatcher.on('getNewCard', createCard);
                    dispatcher.on('editCard', editCard);
                }

                init();

                // Public Interface
                // this.init = init;
            }   // End of Instance
            return CardView;
        } ()); // End of Class

        // Choose either:
        return new CardView(); // Returns an instance (a singleton)
        // return CardView; // Returns a Constructor for multiple instances
    });