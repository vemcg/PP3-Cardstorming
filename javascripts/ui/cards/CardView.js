define(['core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery'],
    function (dispatcher, uniqueId, logger) { "use strict"
        var CardView = (function () {

            function CardView () {

                function createCard(cardAttributes) {
                    require(['text!templates/blankCard.html'],
                        function(html) {
                            $(cardAttributes.target).append(html);

                            var cid = uniqueId.create('card-');
                            var card = $('#TBD');
                            $('#TBD').attr('id', cid);
                            card = $('#' + cid);

                            if ('#projectBoard' == cardAttributes.target) {
                                card.css('top', '' + cardAttributes.y + 'em');
                                card.css('left', '' + cardAttributes.x + 'em');
                                card.css('z-index', cardAttributes.z);
                                card.removeClass('blankCard');
                            }

                            // $('.creator', cid).html(cardAttributes.creator);
                            $('.title', card).html(cid); // later cardAttributes.title);
                            $('.content', card).html(cardAttributes.content);


                            card.addClass(cardAttributes.styling);
                            card.removeClass('hidden');
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
                function init() {
                    dispatcher.on('getNewCard', createCard);
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